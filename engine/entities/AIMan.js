import * as PIXI from 'pixi.js'
import { gameLoop } from '../core/loop'
import Vector from '../utils/vector'
import Man from './Man'
import randomNumGen from '../utils/randomNumberGen'


export default class AIMan extends Man {

    constructor(id, x, y, a, b, player) {
        super(id, x, y, a, b)
        this.topSpeed = 2
        this.speedMinMax = {
            max: 0.01,
            min: 0.002,
        }
        this.breakMinMax = {
            max: 0.03,
            min: 0.008,
        }
        this.speed = randomNumGen(this.speedMinMax.min, this.speedMinMax.max)
        this.randX = ((Math.random() * 1) - 0.5)
        this.randY = randomNumGen(-1, -0.5)
        this.breakPower = randomNumGen(this.breakMinMax.min, this.breakMinMax.max)

        this.movmentTolerance = 0.1

        this.deathTolerance = randomNumGen(170, 230)
        this.deathProb = 1500

        this.randomized = false
    }

    update() {
        if (this.pause) return
        this.checkAnimation()
        if (this.dead) return
        super.update()
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
        // console.log('RANDOMIZING!')
        this.speed = randomNumGen(this.speedMinMax.min, this.speedMinMax.max)
        this.randX = ((Math.random() * 1) - 0.5)
        this.randY = randomNumGen(-1, -0.5)
        this.breakPower = randomNumGen(this.breakMinMax.min, this.breakMinMax.max)
        this.deathTolerance = randomNumGen(170, 230)
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
        if (this.isMoving()) {
            this.animation.animationSpeed = this.animationSpeed()
            if (!this.animation.playing) {
                this.animation.textures = gameEngine.playerSheet['north']
                this.animation.play()
            }
        } else {
            this.animation.textures = gameEngine.playerSheet['standNorth']
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

    checkWin() {
        // checks wether the man has crossed the sucess line
        if (this.location.y < (gameEngine.height*gameEngine.successLine)*0.5) {
            if (!this.hasWon) this.clearContainer()
            this.hasWon = true
        }
    }

    clearContainer() {
        gameEngine.removeGameObject(this, 'gameObjects')
    }

    checkKeyPresses() {
    }
    checkBalance() {
    }

}