class SleepBehaviour implements SheepBehaviour {
    private sheep: Sheep
    private callback: EventListener

    constructor(sheep: Sheep) {
        this.sheep = sheep

        this.sheep.div.style.backgroundImage = "url(images/" + this.sheep.tag + "_sleeping.png)";

        this.callback = () => this.onClick()
        this.sheep.div.addEventListener("click", this.callback)

    }

    private onClick() {
        this.sheep.div.removeEventListener("click", this.callback)
        console.log("awake! start running!")

        this.sheep.sheepBehaviour = new RunBehaviour(this.sheep)
    }

    public update() {
        // just sleeping ...do nothing...
    }
}