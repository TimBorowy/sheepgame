class Game {

    private static instance: Game;
    public fenton: Fenton
    public wolf: Wolf

    private score: number = 0

    public gameObjects: GameObject[] = []

    constructor() {

        //the contructor
    }

    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    public init() {

        this.fenton = new Fenton()
        this.wolf = new Wolf(this)

        this.gameObjects.push(this.fenton)
        this.gameObjects.push(this.wolf)

        for (let i = 0; i < 40; i++) {

            let sheep = new Sheep(this.fenton, this)
            this.gameObjects.push(sheep)
            this.wolf.subscribe(sheep)
        }

        this.update()
    }

    private update(): void {

        // start checking for collisions after alle elements are in place
        setTimeout(() => this.checkCollision(), 100)



        // update all game objects here
        for (let obj of this.gameObjects) {
            obj.update()
        }

        requestAnimationFrame(() => this.update())
    }

    // helper function to remove an object from the DOM and from the game
    public removeFromGame(g: Sheep) {
        g.div.remove()
        this.gameObjects.splice(this.gameObjects.indexOf(g), 1)
    }

    public checkCollision() {
        for (let go1 of this.gameObjects) {

            if (go1 instanceof Wolf) {
                // send all the sheep to the wolf 
                let sheep: Sheep[] = (this.gameObjects.filter(go => go instanceof Sheep)) as Sheep[]
                go1.eatSheep(sheep)

            }
        }
    }

    public increaseScore() {
        this.score += 10
        console.log(this.score)
    }

    public gameOver() {

    }
}

window.addEventListener("load", () => {
    Game.getInstance().init()
})