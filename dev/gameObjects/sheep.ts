// use reference path with /// to include object code
/// <reference path="GameObject.ts" />

class Sheep extends GameObject implements Observer {

    private callback: EventListener
    private _fenton: Fenton
    private _sheepBehaviour: SheepBehaviour
    public game: Game

    private active: boolean = false

    public set fenton(f: Fenton) {
        this._fenton = f
    }
    public get fenton(): Fenton {
        return this._fenton
    }

    public set sheepBehaviour(b: SheepBehaviour) {
        this._sheepBehaviour = b;
    }
    public get sheepBehaviour(): SheepBehaviour {
        return this._sheepBehaviour;
    }

    constructor(fenton: Fenton, game: Game) {
        super("sheep")

        this.game = game

        this.fenton = fenton

        this.sheepBehaviour = new SleepBehaviour(this)
    }

    public update() {
        this.sheepBehaviour.update()
        this.draw()
    }

    public notify() {
        console.log('sheep woke up')

        this.sheepBehaviour = new RunBehaviour(this)
    }

    public playSound() {
        var audio = new Audio('sheep.mp3')
        audio.play()
    }
}