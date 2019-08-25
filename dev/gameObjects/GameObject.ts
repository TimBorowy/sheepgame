class GameObject {

    public _x: number = 0
    public _y: number = 0
    public _div: HTMLElement
    private _xspeed: number = 0
    private _yspeed: number = 0
    private _width: number = 0
    private _height: number = 0
    private _facing: number = 1
    private _tag: string

    //Properties
    public get x(): number { return this._x; }
    public set x(value: number) { this._x = value; }

    public get y(): number { return this._y; }
    public set y(value: number) { this._y = value; }

    public get width(): number { return this._width; }
    public set width(v: number) { this._width = v; }

    public get height(): number { return this._height; }
    public set height(v: number) { this._height = v; }

    public get facing(): number { return this._facing; }
    public set facing(v: number) { this._facing = v; }

    public get tag(): string { return this._tag; }
    public set tag(v: string) { this._tag = v; }

    public get div(): HTMLElement { return this._div; }
    public set div(v: HTMLElement) { this._div = v; }

    public get xspeed(): number { return this._xspeed; }
    public set xspeed(v: number) { this._xspeed = v; }

    public get yspeed(): number { return this._yspeed; }
    public set yspeed(v: number) { this._yspeed = v; }


    constructor(tag: string) {
        this.tag = tag

        let parent: HTMLElement = (document.querySelector("game")!) as HTMLElement
        this.div = document.createElement(this.tag)
        parent.appendChild(this.div)

        this.width = this.div.clientWidth
        this.height = this.div.clientHeight

        this.x = Math.random() * (window.innerWidth - this.width)
        this.y = Math.random() * (window.innerHeight - this.height)
    }

    protected draw(): void {
        this.div.style.transform = `translate(${this.x - this.width / 2}px, ${this.y - this.height / 2}px) scale(${this.facing},1)`
    }

    //child override
    public update() {

    }
}