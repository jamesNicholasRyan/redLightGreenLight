import * as PIXI from 'pixi.js'
import Vector from '../utils/vector'
import GameObject from './GameObject'


export default class Man extends GameObject {

    constructor(id, x, y, a, b) {
        super(x, y, a, b)
        this.id = id
        this.startingLocationX = x
        this.startingLocationY = y
        this.speed = 0.08
        this.topSpeed = 3.5
        this.breakPower = 0.08
        this.movmentTolerance = 0.1

        this.lives = 3

        this.dead = false
        this.deathCount = 0
        this.deathTolerance = 75
        this.hasWon = false

        // ANIMATION VARIABLES
        this.breaking = false
        this.balancing = false
        this.animation = ''
        this.lastKeyPress = ''
        this.shot = false
    }

    // intializes the sprites/graphics when loading into the game engine
    createDisplay() {
        this.animation = new PIXI.AnimatedSprite(gameEngine.playerSheet.standSouth)
        this.animation.anchor.set(0.5)
        this.animation.animationSpeed = .1
        this.animation.loop = false
        this.animation.width = 52
        this.animation.height = 72
        this.animation.x = this.location.x
        this.animation.y = this.location.y
        return this.animation
    }

    display() {
        this.animation.x = this.location.x
        this.animation.y = this.location.y
        this.animation.play()
    }

    update() {
        super.update()
        if (this.pause) return
        this.checkKeyPresses()
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

    stop() {
        this.velocity = new Vector(0,0)
    }

    isMoving() {
        // this method checks whether the man is moving
        if (this.velocity.length() > this.movmentTolerance) return true
        return false
    }

    isDying() {
        // this method checks whether the player is moving and redLight light is showing
        if (this.isMoving() && window.gameEngine.redLight) {
            // console.log('DEATH COUNT:', this.deathCount)
            this.deathCount ++
        } else {
            this.deathCount = 0
        }
    }

    checkDeathTimer() {
        // Checks whether the player has moved enough during redlight, to be noticed / killed
        if (this.deathCount > this.deathTolerance) {
            this.dead = true
        }
        if (this.lives <= 0) gameEngine.lose = true
    }

    checkDead() {
        // checks dead boolean to see if man has died yet.
        // This is here because there may be multiple ways to die!
        if (this.dead) {
            if (this.shot) return
            this.shot = true
            // this.reset()
            this.lives --
            window.world.shootBullet(this.location)
        }
    }

    checkWin() {
        // checks wether the man has crossed the sucess line
        if (this.location.y < gameEngine.height*gameEngine.successLine) {
            this.hasWon = true
            console.log('YOU WIN!!!!!!')
        }
    }

    checkBalance() {
        // This method checks wether the man is alive, stationary and the 
        // red light is on, and returns this.blance as true
        if (this.isMoving() && !window.gameEngine.redLight) return this.balancing = false
        return this.balancing = true
    }

    checkAnimation() {
        // this function checks if the man is moving, and provides the correct texture for the movement
        if (this.dead) {
            this.animation.textures = gameEngine.playerSheet['dead']
            return
        }

        if (this.isMoving()) {
            if (!this.animation.playing) {
                this.animation.textures = gameEngine.playerSheet[this.lastKeyPress]
                this.animation.play()
            }
        } else {
            this.lastKeyPress = 'standSouth'
            if (!this.animation.playing) {
                this.animation.textures = gameEngine.playerSheet[this.lastKeyPress]
                this.animation.play()
            }
        }
    }

    checkKeyPresses() {
        if (window.gameEngine.keyW) {                        // UP
            this.applyForce(new Vector(0,-this.speed))
            this.lastKeyPress = 'north'
        } else if (window.gameEngine.keyA) {                 // LEFT
            this.applyForce(new Vector(-this.speed,0))
            this.lastKeyPress = 'west'
        } else if (window.gameEngine.keyS) {                 // DOWN
            this.applyForce(new Vector(0,this.speed))
            this.lastKeyPress = 'south'
        } else if (window.gameEngine.keyD) {                 // RIGHT
            this.applyForce(new Vector(this.speed,0))
            this.lastKeyPress = 'east'
        } else if (window.gameEngine.spaceBar) {             // SPACE
            this.lastKeyPress = 'south'
            this.breakMan()
        } else {                                             // NOTHING

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
        if (!this.isMoving()) {
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

    reset() {
        // resets the object
        console.log('RESETTING MAN')
        this.location.x = this.startingLocationX
        this.location.y = this.startingLocationY
        this.acceleration = new Vector(0,0)
        this.velocity = new Vector(0,0)
        this.dead = false
    }
    
}