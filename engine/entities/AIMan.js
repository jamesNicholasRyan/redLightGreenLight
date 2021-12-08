import * as PIXI from 'pixi.js'
import { gameLoop } from '../core/loop'
import Vector from '../utils/vector'
import GameObject from './GameObject'
import Man from './Man'
import randomNumGen from '../utils/randomNumberGen'


export default class AIMan extends Man {

    constructor(id, x, y, a, b) {
        super(id, x, y, a, b)
        this.topSpeed = 10
        this.speedMinMax = {
            max: 0.02,
            min: 0.005,
        }
        this.breakMinMax = {
            max: 0.03,
            min: 0.005,
        }
        this.speed = randomNumGen(this.speedMinMax.min, this.speedMinMax.max)
        this.randX = ((Math.random() * 1) - 0.5)
        this.randY = randomNumGen(-1, -0.5)
        this.breakPower = randomNumGen(this.breakMinMax.min, this.breakMinMax.max)

        this.movmentTolerance = 0.1

        this.deathTolerance = 200

        this.randomized = false
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

    randomizeVariables() {
        console.log('RANDOMIZING!')
        this.speed = randomNumGen(this.speedMinMax.min, this.speedMinMax.max)
        this.randX = ((Math.random() * 1) - 0.5)
        this.randY = randomNumGen(-1, -0.5)
        this.breakPower = randomNumGen(this.breakMinMax.min, this.breakMinMax.max)
        console.log(this.speed)
    }

    AImove() {
        this.randomized = false
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

    breakMan() {
        if (!this.isMoving()) {
            this.stop()
            if (!this.randomized) {
                this.randomizeVariables()
                this.randomized = true
            }
            return
        }
        let breakForce = new Vector(this.velocity.x, this.velocity.y)
        breakForce.normalize()
        breakForce.multiply(-1)
        breakForce.multiply(this.breakPower)
        this.applyForce(breakForce)
    }

    checkKeyPresses() {
    }
    checkBalance() {
    }

}