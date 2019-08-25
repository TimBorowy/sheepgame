"use strict";
class Game {
    constructor() {
        this.score = 0;
        this.gameObjects = [];
    }
    static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
    init() {
        this.fenton = new Fenton();
        this.wolf = new Wolf(this);
        this.gameObjects.push(this.fenton);
        this.gameObjects.push(this.wolf);
        for (let i = 0; i < 40; i++) {
            let sheep = new Sheep(this.fenton, this);
            this.gameObjects.push(sheep);
            this.wolf.subscribe(sheep);
        }
        this.update();
    }
    update() {
        setTimeout(() => this.checkCollision(), 100);
        for (let obj of this.gameObjects) {
            obj.update();
        }
        requestAnimationFrame(() => this.update());
    }
    removeFromGame(g) {
        g.div.remove();
        this.gameObjects.splice(this.gameObjects.indexOf(g), 1);
    }
    checkCollision() {
        for (let go1 of this.gameObjects) {
            if (go1 instanceof Wolf) {
                let sheep = (this.gameObjects.filter(go => go instanceof Sheep));
                go1.eatSheep(sheep);
            }
        }
    }
    increaseScore() {
        this.score += 10;
        console.log(this.score);
    }
    gameOver() {
    }
}
window.addEventListener("load", () => {
    Game.getInstance().init();
});
class Util {
    static getDistance(g1, g2) {
        let x = g1.x - g2.x;
        let y = g1.y - g2.y;
        let total = Math.sqrt(x * x + y * y);
        return {
            x, y, total
        };
    }
    static constrain(n, min, max) {
        return Math.min(Math.max(n, min), max);
    }
    static checkCollision(a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }
}
class RunBehaviour {
    constructor(sheep) {
        this.sheep = sheep;
        this.sheep.playSound();
        this.sheep.div.style.backgroundImage = "url(images/" + this.sheep.tag + ".png)";
    }
    update() {
        this.calculateSpeed();
        this.checkPenReached();
        this.sheep.x = Util.constrain(this.sheep.x + this.sheep.xspeed, 50, window.innerWidth - 50);
        this.sheep.y = Util.constrain(this.sheep.y + this.sheep.yspeed, 50, window.innerHeight - 50);
    }
    calculateSpeed() {
        let distance = Util.getDistance(this.sheep, this.sheep.fenton);
        this.sheep.xspeed = distance.x / distance.total * (280 / distance.total) * 3;
        this.sheep.yspeed = distance.y / distance.total * (280 / distance.total) * 3;
        this.sheep.facing = (this.sheep.xspeed < 0) ? 1 : -1;
    }
    checkPenReached() {
        if (this.sheep.x < 325 && this.sheep.y > window.innerHeight - 234) {
            console.log("this sheep has reached the pen!");
            this.sheep.game.wolf.unSubscribe(this.sheep);
            this.sheep.game.removeFromGame(this.sheep);
            this.sheep.game.increaseScore();
        }
    }
}
class SleepBehaviour {
    constructor(sheep) {
        this.sheep = sheep;
        this.sheep.div.style.backgroundImage = "url(images/" + this.sheep.tag + "_sleeping.png)";
        this.callback = () => this.onClick();
        this.sheep.div.addEventListener("click", this.callback);
    }
    onClick() {
        this.sheep.div.removeEventListener("click", this.callback);
        console.log("awake! start running!");
        this.sheep.sheepBehaviour = new RunBehaviour(this.sheep);
    }
    update() {
    }
}
class GameObject {
    constructor(tag) {
        this._x = 0;
        this._y = 0;
        this._xspeed = 0;
        this._yspeed = 0;
        this._width = 0;
        this._height = 0;
        this._facing = 1;
        this.tag = tag;
        let parent = (document.querySelector("game"));
        this.div = document.createElement(this.tag);
        parent.appendChild(this.div);
        this.width = this.div.clientWidth;
        this.height = this.div.clientHeight;
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight - this.height);
    }
    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    set y(value) { this._y = value; }
    get width() { return this._width; }
    set width(v) { this._width = v; }
    get height() { return this._height; }
    set height(v) { this._height = v; }
    get facing() { return this._facing; }
    set facing(v) { this._facing = v; }
    get tag() { return this._tag; }
    set tag(v) { this._tag = v; }
    get div() { return this._div; }
    set div(v) { this._div = v; }
    get xspeed() { return this._xspeed; }
    set xspeed(v) { this._xspeed = v; }
    get yspeed() { return this._yspeed; }
    set yspeed(v) { this._yspeed = v; }
    draw() {
        this.div.style.transform = `translate(${this.x - this.width / 2}px, ${this.y - this.height / 2}px) scale(${this.facing},1)`;
    }
    update() {
    }
}
class Fenton extends GameObject {
    constructor() {
        super("fenton");
        this.xtarget = 0;
        this.ytarget = 0;
        this.xtarget = window.innerWidth / 2;
        this.ytarget = window.innerHeight / 2;
        this.callback = (e) => this.onMouseMove(e);
        window.addEventListener("mousemove", this.callback);
    }
    onMouseMove(e) {
        this.xtarget = e.clientX;
        this.ytarget = e.clientY;
    }
    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        this.xspeed = (this.xtarget - this.x) / 35;
        this.yspeed = (this.ytarget - this.y) / 35;
        this.draw();
    }
}
class Sheep extends GameObject {
    constructor(fenton, game) {
        super("sheep");
        this.active = false;
        this.game = game;
        this.fenton = fenton;
        this.sheepBehaviour = new SleepBehaviour(this);
    }
    set fenton(f) {
        this._fenton = f;
    }
    get fenton() {
        return this._fenton;
    }
    set sheepBehaviour(b) {
        this._sheepBehaviour = b;
    }
    get sheepBehaviour() {
        return this._sheepBehaviour;
    }
    update() {
        this.sheepBehaviour.update();
        this.draw();
    }
    notify() {
        console.log('sheep woke up');
        this.sheepBehaviour = new RunBehaviour(this);
    }
    playSound() {
        var audio = new Audio('sheep.mp3');
        audio.play();
    }
}
class Wolf extends GameObject {
    constructor(game) {
        super("wolf");
        this.noiseTimer = 0;
        this.observers = [];
        this.xspeed = 1;
        this.yspeed = 1;
        this.game = game;
    }
    update() {
        this.noiseTimer++;
        if (this.noiseTimer == 600) {
            this.playSound();
            console.log("Wolf makes noise!!!");
            this.div.style.backgroundImage = "url(images/wolf_howling.png)";
            for (let obs of this.observers) {
                obs.notify();
            }
        }
        this.x += this.xspeed;
        this.y += this.yspeed;
        if (this.x < 50 || this.x > window.innerWidth - 50) {
            this.xspeed *= -1;
        }
        if (this.y < 50 || this.y > window.innerHeight - 50) {
            this.yspeed *= -1;
        }
        this.facing = (this.xspeed < 0) ? 1 : -1;
        this.draw();
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unSubscribe(observer) {
        let i = this.observers.indexOf(observer);
        if (i != -1) {
            this.observers.splice(i, 1);
        }
    }
    eatSheep(sheep) {
        for (let sh of sheep) {
            let sheepRect = sh.div.getBoundingClientRect();
            let wolfRect = this.div.getBoundingClientRect();
            if (Util.checkCollision(sheepRect, wolfRect)) {
                this.unSubscribe(sh);
                this.game.removeFromGame(sh);
                console.log('wolf ate sheep');
            }
        }
    }
    playSound() {
        var audio = new Audio('wolf.mp3');
        audio.play();
    }
}
//# sourceMappingURL=main.js.map