import * as PIXI from 'pixi.js'
import Vector from '../utils/vector'
import GameObject from './GameObject'


export default class Man extends GameObject {

    constructor(x, y, a, b) {
        super(x, y, a, b)
        this.speed = 0.08
        this.topSpeed = 3.5
        this.breakPower = 0.08
    }

    update(){
        console.log(this.velocity)
        this.checkKeyPresses()
        this.checkEdges()
        // this.drag()
        // this.friction()
        super.update()
    }

    stop() {
        this.velocity = new Vector(0,0)
    }

    checkKeyPresses() {
        if (window.gameEngine.keyW) {
            this.applyForce(new Vector(0,-this.speed))
        } else if (window.gameEngine.keyA) {
            this.applyForce(new Vector(-this.speed,0))
        } else if (window.gameEngine.keyS) {
            this.applyForce(new Vector(0,this.speed))
        } else if (window.gameEngine.keyD) {
            this.applyForce(new Vector(this.speed,0))
        } else if (window.gameEngine.spaceBar) {
            this.breakMan()
        }
    }

    checkEdges() {
        // check if the man is at the edge of the game board and stop him
        if (this.location.x > window.gameEngine.width) {
            this.location.x = window.gameEngine.width
            this.velocity.x = 0
        } else if (this.location.x < 0) {
            this.location.x = 0
            this.velocity.x = 0
        } else if (this.location.y > window.gameEngine.height) {
            this.location.y = window.gameEngine.height
            this.velocity.y = 0
        } else if (this.location.y < 0) {
            this.location.y = 0
            this.velocity.y = 0
        }
    }

    breakMan() {
        if (this.velocity.length() < 0.1) {
            this.stop()
            return
        }
        let breakForce = new Vector(this.velocity.x, this.velocity.y)
        breakForce.normalize()
        breakForce.multiply(-1)
        breakForce.multiply(this.breakPower)
        this.applyForce(breakForce)
    }

    friction() {
        // calculates friction applied to man object
        const frictionCoef = 0.1
        let friction = new Vector(this.velocity.x, this.velocity.y)
        friction.normalize()
        friction.multiply(-1)
        friction.multiply(frictionCoef)

        this.applyForce(friction)
    }
}