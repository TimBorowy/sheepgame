"use strict";
class Fenton {
    constructor() {
        this.xspeed = 0;
        this.yspeed = 0;
        this.xtarget = 0;
        this.ytarget = 0;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.facing = 1;
        this.tag = "fenton";
        let parent = (document.querySelector("game"));
        this.div = document.createElement(this.tag);
        parent.appendChild(this.div);
        this.width = this.div.clientWidth;
        this.height = this.div.clientHeight;
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight - this.height);
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
    draw() {
        this.div.style.transform = `translate(${this.x - this.width / 2}px, ${this.y - this.height / 2}px) scale(${this.facing},1)`;
    }
}
class Game {
    constructor() {
        this.sheep = [];
        this.init();
    }
    init() {
        this.fenton = new Fenton();
        this.wolf = new Wolf();
        for (let i = 0; i < 40; i++) {
            this.sheep.push(new Sheep());
        }
        this.update();
    }
    update() {
        requestAnimationFrame(() => this.update());
    }
    removeFromGame(g) {
        g.div.remove();
        this.sheep.splice(this.sheep.indexOf(g), 1);
    }
    gameOver() {
    }
}
window.addEventListener("load", () => {
    new Game();
});
class Sheep {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.width = 0;
        this.height = 0;
        this.facing = 1;
        this.tag = "sheep";
        let parent = (document.querySelector("game"));
        this.div = document.createElement(this.tag);
        parent.appendChild(this.div);
        this.width = this.div.clientWidth;
        this.height = this.div.clientHeight;
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight - this.height);
        this.setSleeping();
    }
    setSleeping() {
        this.div.style.backgroundImage = "url(images/" + this.tag + "_sleeping.png)";
        this.callback = () => this.onClick();
        this.div.addEventListener("click", this.callback);
    }
    update() {
        this.draw();
    }
    draw() {
        this.div.style.transform = `translate(${this.x - this.width / 2}px, ${this.y - this.height / 2}px) scale(${this.facing},1)`;
    }
    onClick() {
        this.div.removeEventListener("click", this.callback);
        console.log("awake! start running!");
        this.setRunning();
    }
    setRunning() {
        this.div.style.backgroundImage = "url(images/" + this.tag + ".png)";
        this.x = Util.constrain(this.x + this.xspeed, 50, window.innerWidth - 50);
        this.y = Util.constrain(this.y + this.yspeed, 50, window.innerHeight - 50);
        this.calculateSpeed();
        this.checkPenReached();
    }
    calculateSpeed() {
        let fenton;
        let distance = Util.getDistance(this, fenton);
        this.xspeed = distance.x / distance.total * (280 / distance.total) * 3;
        this.yspeed = distance.y / distance.total * (280 / distance.total) * 3;
        this.facing = (this.xspeed < 0) ? 1 : -1;
    }
    checkPenReached() {
        if (this.x < 325 && this.y > window.innerHeight - 234) {
            console.log("this sheep has reached the pen!");
        }
    }
}
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
class Wolf {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.width = 0;
        this.height = 0;
        this.facing = 1;
        this.noiseTimer = 0;
        this.tag = "wolf";
        let parent = (document.querySelector("game"));
        this.div = document.createElement(this.tag);
        parent.appendChild(this.div);
        this.width = this.div.clientWidth;
        this.height = this.div.clientHeight;
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight - this.height);
    }
    update() {
        this.noiseTimer++;
        if (this.noiseTimer == 600) {
            console.log("Wolf makes noise!!!");
            this.div.style.backgroundImage = "url(images/wolf_howling.png)";
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
        this.eatSheep();
        this.draw();
    }
    draw() {
        this.div.style.transform = `translate(${this.x - this.width / 2}px, ${this.y - this.height / 2}px) scale(${this.facing},1)`;
    }
    eatSheep() {
    }
}
//# sourceMappingURL=main.js.map