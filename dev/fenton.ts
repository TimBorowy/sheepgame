// use reference path with /// to include object code
// /// <reference path="" />

class Fenton {

    private xspeed: number = 0
    private yspeed: number = 0
    private xtarget: number = 0
    private ytarget: number = 0

    public x: number = 0
    public y: number = 0
    public div: HTMLElement
    private width: number = 0
    private height: number = 0
    private facing: number = 1
    private tag: string

    private callback: EventListener

    constructor() {
        this.tag = "fenton"

        let parent: HTMLElement = (document.querySelector("game")!) as HTMLElement
        this.div = document.createElement(this.tag)
        parent.appendChild(this.div)

        this.width = this.div.clientWidth
        this.height = this.div.clientHeight

        this.x = Math.random() * (window.innerWidth - this.width)
        this.y = Math.random() * (window.innerHeight - this.height)

        this.xtarget = window.innerWidth / 2
        this.ytarget = window.innerHeight / 2

        this.callback = (e: Event) => this.onMouseMove(e as MouseEvent)
        window.addEventListener("mousemove", this.callback)
    }

    private onMouseMove(e: MouseEvent) {
        this.xtarget = e.clientX
        this.ytarget = e.clientY
    }

    public update() {
        this.x += this.xspeed
        this.y += this.yspeed

        // calculate fenton's speed according to the target position
        this.xspeed = (this.xtarget - this.x) / 35
        this.yspeed = (this.ytarget - this.y) / 35

        this.draw()
    }

    public draw(): void {
        this.div.style.transform = `translate(${this.x - this.width / 2}px, ${this.y - this.height / 2}px) scale(${this.facing},1)`
    }
}