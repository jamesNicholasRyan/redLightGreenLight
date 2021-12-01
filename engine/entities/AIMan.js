import * as PIXI from 'pixi.js'
import Vector from '../utils/vector'
import GameObject from './GameObject'
import Man from './Man'


export default class AIMan extends Man {

    constructor(id, x, y, a, b) {
        super(id, x, y, a, b)
        this.speed = 0.08
        this.topSpeed = 3.5
        this.randX = Math.random() * (this.speed/2 - -(this.speed/2) + 1) + - (this.speed/2)
        // this.randX = Math.random(-this.speed/2, this.speed/2)
        this.randY = Math.random(0, this.speed) *-1
    }

    update() {
        super.update()
        if (this.pause) return
        this.AImove()
        this.checkEdges()
        this.checkAnimation()
        // this.drag()
        // this.friction()
        if (!this.hasWon) {
            this.isDying()
            this.checkDeathTimer()
            this.checkDead()
            this.checkBalance()
            this.checkWin()
        }
    }

    AImove() {
        console.log(this.active)
        // Move the AI man in a 'random' direction towards the finish line
        const randomDirection = new Vector(this.randX, this.randY)
        this.applyForce(randomDirection)
    }

}