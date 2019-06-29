class Game {

    public fenton : Fenton
    public wolf : Wolf
    public sheep : Sheep[] = []

    constructor() {
        this.init()
    }

    public init() {
 
        this.fenton = new Fenton()
        this.wolf = new Wolf()

        for(let i = 0; i<40; i++){
            this.sheep.push(new Sheep())
        }
                
        this.update()
    }

    private update() : void {
        // update all game objects here


        requestAnimationFrame(() => this.update())
    }

    // helper function to remove an object from the DOM and from the game
    public removeFromGame(g:Sheep){      
        g.div.remove()
        this.sheep.splice(this.sheep.indexOf(g), 1)
    }

    public gameOver(){

    }
}

window.addEventListener("load", () => {
    new Game()
})