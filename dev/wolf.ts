// use reference path with /// to include object code
// /// <reference path="" />

class Wolf {

    public x: number = 0
    public y: number = 0
    public div: HTMLElement
    private xspeed: number = 0
    private yspeed: number = 0
    private width: number = 0
    private height: number = 0
    private facing: number = 1
    private tag: string
    private noiseTimer:number = 0

    constructor() {
        this.tag = "wolf"

        let parent: HTMLElement = (document.querySelector("game")!) as HTMLElement
        this.div = document.createElement(this.tag)
        parent.appendChild(this.div)

        this.width = this.div.clientWidth
        this.height = this.div.clientHeight

        this.x = Math.random() * (window.innerWidth - this.width)
        this.y = Math.random() * (window.innerHeight - this.height)
    }

    public update() {
       
        this.noiseTimer++
        if (this.noiseTimer == 600){
            console.log("Wolf makes noise!!!")
            this.div.style.backgroundImage = "url(images/wolf_howling.png)";
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

        this.eatSheep()
        this.draw()
    }

    private draw(): void {
        this.div.style.transform = `translate(${this.x - this.width / 2}px, ${this.y - this.height / 2}px) scale(${this.facing},1)`
    }

    private eatSheep() {
        // check collision with all the sheep in the game

        // example: get a rectangle of an object:
        // let rect = gameobject.div.getBoundingClientRect()

        // example: check collision between two rectangles:
        // let hit = Util.checkCollision(rect, otherRect)
        // console.log(hit)
    }
}