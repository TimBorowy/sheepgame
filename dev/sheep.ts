// use reference path with /// to include object code
// /// <reference path="" />

class Sheep {

    public x: number = 0
    public y: number = 0
    public div: HTMLElement
    private xspeed: number = 0
    private yspeed: number = 0
    private width: number = 0
    private height: number = 0
    private facing: number = 1
    private tag: string
    private callback: EventListener
    

    constructor() {
        this.tag = "sheep"

        let parent: HTMLElement = (document.querySelector("game")!) as HTMLElement
        this.div = document.createElement(this.tag)
        parent.appendChild(this.div)

        this.width = this.div.clientWidth
        this.height = this.div.clientHeight

        this.x = Math.random() * (window.innerWidth - this.width)
        this.y = Math.random() * (window.innerHeight - this.height)

        this.setSleeping()
    }

    private setSleeping(){
        this.div.style.backgroundImage = "url(images/" + this.tag + "_sleeping.png)";

        this.callback = () => this.onClick()
        this.div.addEventListener("click", this.callback)
    }

    public update() {
        // just sleeping ...do nothing...
        this.draw()
    }

    private draw(): void {
        this.div.style.transform = `translate(${this.x - this.width / 2}px, ${this.y - this.height / 2}px) scale(${this.facing},1)`
    }

    private onClick() {
        this.div.removeEventListener("click", this.callback)
        console.log("awake! start running!")
        this.setRunning()
    }

    private setRunning(){
        this.div.style.backgroundImage = "url(images/" + this.tag + ".png)"

        // only when running, call this code in the update function
        this.x = Util.constrain(this.x + this.xspeed, 50, window.innerWidth - 50)
        this.y = Util.constrain(this.y + this.yspeed, 50, window.innerHeight - 50)

        this.calculateSpeed()
        this.checkPenReached()
    }

    private calculateSpeed() {
        // todo, get the fenton object to calculate the distance between the running sheep and fenton
        let fenton : Fenton  

        let distance: Distance = Util.getDistance(this, fenton)

        // use this to make the sheep run faster if fenton gets closer
        this.xspeed = distance.x / distance.total * (280 / distance.total) * 3
        this.yspeed = distance.y / distance.total * (280 / distance.total) * 3

        // look left when walking left
        this.facing = (this.xspeed < 0) ? 1 : -1
    }

    private checkPenReached() {
        if (this.x < 325 && this.y > window.innerHeight - 234) {
            console.log("this sheep has reached the pen!")
        }
    }
}