class RunBehaviour implements SheepBehaviour {

    private sheep: Sheep

    constructor(sheep: Sheep) {
        this.sheep = sheep

        this.sheep.playSound()

        this.sheep.div.style.backgroundImage = "url(images/" + this.sheep.tag + ".png)"
    }

    public update() {

        this.calculateSpeed()
        this.checkPenReached()

        // only when running, call this code in the update function
        this.sheep.x = Util.constrain(this.sheep.x + this.sheep.xspeed, 50, window.innerWidth - 50)
        this.sheep.y = Util.constrain(this.sheep.y + this.sheep.yspeed, 50, window.innerHeight - 50)
    }

    private calculateSpeed() {
        // todo, get the fenton object to calculate the distance between the running sheep and fenton
        //done

        let distance: Distance = Util.getDistance(this.sheep, this.sheep.fenton)

        // use this to make the sheep run faster if fenton gets closer
        this.sheep.xspeed = distance.x / distance.total * (280 / distance.total) * 3
        this.sheep.yspeed = distance.y / distance.total * (280 / distance.total) * 3

        // look left when walking left
        this.sheep.facing = (this.sheep.xspeed < 0) ? 1 : -1
    }

    private checkPenReached() {
        if (this.sheep.x < 325 && this.sheep.y > window.innerHeight - 234) {
            console.log("this sheep has reached the pen!")

            // remove sheep from wolf subscription
            this.sheep.game.wolf.unSubscribe(this.sheep)

            // remove sheep
            this.sheep.game.removeFromGame(this.sheep)

            // up the score
            this.sheep.game.increaseScore()
        }
    }

}