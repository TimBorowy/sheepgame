// use reference path with /// to include object code
/// <reference path="GameObject.ts" />

class Fenton extends GameObject {

    private xtarget: number = 0
    private ytarget: number = 0

    private callback: EventListener

    constructor() {
        super("fenton")

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

}