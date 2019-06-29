class Util {

    // bereken de afstand tussen twee gameobjects
    static getDistance(g1:Sheep, g2:Fenton) : Distance {
        let x: number = g1.x - g2.x
        let y: number = g1.y - g2.y
        let total : number = Math.sqrt(x * x + y * y)
        
        return {
            x , y , total 
        }
    }

    // hou een nummer binnen een minimum en een maximum
    static constrain(n:number, min:number, max:number) : number {
        return Math.min(Math.max(n, min), max)
    }


    // check collision tussen twee rectangles
    // de rectangle van een div vraag je op met div.getBoundingClientRect()
    static checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
}