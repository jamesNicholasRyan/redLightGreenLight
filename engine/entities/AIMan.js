import * as PIXI from 'pixi.js'
import { gameLoop } from '../core/loop'
import Vector from '../utils/vector'
import GameObject from './GameObject'
import Man from './Man'
import randomNumGen from '../utils/randomNumberGen'


export default class AIMan extends Man {

    constructor(id, x, y, a, b) {
        super(id, x, y, a, b)
        this.topSpeed = 10000
        this.speed = randomNumGen(0.02, 0.005)
        this.randX = ((Math.random() * 1) - 0.5)
        this.randY = -0.5
        this.randY = randomNumGen(-1, -0.5)

        this.movmentTolerance = 0.1
        this.breakPower = randomNumGen(0.025, 0.01)

        this.deathTolerance = 150
    }

    update() {
        this.checkAnimation()
        if (this.dead) return
        super.update()
        if (this.pause) return
        this.checkEdges()
        if (gameEngine.redLight) {
            this.breakMan()
        } else {
            this.AImove()
        }
        if (!this.hasWon) {
            this.isDying()
            this.checkDeathTimer()
            this.checkDead()
            this.checkWin()
        }
    }

    AImove() {
        // Move the AI man in a 'random' direction towards the finish line
        const randomDirection = new Vector(this.randX, this.randY)
        const normalised = randomDirection.normalize()
        const directionSpeed = normalised.multiply(this.speed)
        this.applyForce(directionSpeed)
    }

    // empty to cancel these methods out
    checkAnimation() {
        if (this.dead) {
            this.animation.textures = gameEngine.playerSheet['dead']
            return
        }
    }
    checkKeyPresses() {
    }
    checkBalance() {
    }

}