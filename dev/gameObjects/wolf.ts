// use reference path with /// to include object code
/// <reference path="GameObject.ts" />

class Wolf extends GameObject implements Subject {


    private noiseTimer: number = 0
    private observers: Observer[] = []
    public game: Game

    constructor(game: Game) {
        super("wolf")

        this.xspeed = 1
        this.yspeed = 1

        this.game = game
    }

    public update() {

        this.noiseTimer++
        if (this.noiseTimer == 600) {

            this.playSound()

            console.log("Wolf makes noise!!!")
            this.div.style.backgroundImage = "url(images/wolf_howling.png)";

            for (let obs of this.observers) {
                obs.notify()
            }
        }

        this.x += this.xspeed
        this.y += this.yspeed

        if (this.x < 50 || this.x > window.innerWidth - 50) {
            this.xspeed *= -1
        }

        if (this.y < 50 || this.y > window.innerHeight - 50) {
            this.yspeed *= -1
        }

        this.facing = (this.xspeed < 0) ? 1 : -1

        this.draw()
    }

    public subscribe(observer: Observer) {
        this.observers.push(observer)
    }

    public unSubscribe(observer: Observer) {
        let i: number = this.observers.indexOf(observer)
        if (i != -1) {
            this.observers.splice(i, 1)
        }
    }

    public eatSheep(sheep: Sheep[]) {

        // check collision with all the sheep in the game
        for (let sh of sheep) {
            let sheepRect = sh.div.getBoundingClientRect()
            let wolfRect = this.div.getBoundingClientRect()

            if (Util.checkCollision(sheepRect, wolfRect)) {

                // safely remove all refrences of sheep from game
                this.unSubscribe(sh)
                this.game.removeFromGame(sh)
                console.log('wolf ate sheep')
            }
        }
    }

    public playSound() {
        var audio = new Audio('wolf.mp3')
        audio.play()
    }
}