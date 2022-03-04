import * as PIXI from 'pixi.js'
import Vector from '../utils/vector'
import GameObject from './GameObject'
import rectanglesCollide from '../utils/rectCollision'


export default class Man extends GameObject {

    constructor(id, x, y, a, b) {
        super(x, y, a, b)
        this.id = id
        this.startingLocationX = x
        this.startingLocationY = y
        this.speed = 0.03
        this.topSpeed = 1.1
        this.slowTopSpeed = 0.2
        this.normalTopSpeed = 1.1
        this.breakPower = 0.03
        this.movmentTolerance = 0.1
        this.player = true

        this.lives = 3
        this.dead = false
        this.deathCount = 0
        this.deathTolerance = 75
        this.hasWon = false

        // ANIMATION VARIABLES
        this.showHitBoxes = false
        this.animationWidth = 52  *this.ratio
        this.animationHeight = 72  *this.ratio
        this.hitBoxData = {
            x: -this.animationWidth*0.4,
            y: this.animationHeight*0.2,
            width: this.animationWidth*0.85,
            height: this.animationHeight*0.3
        }
        this.breaking = false
        this.balancing = false
        this.animation = ''
        this.hitBox = new PIXI.Graphics()
        this.lastKeyPress = ''
        this.shot = false
    }

    // intializes the sprites/graphics when loading into the game engine
    createDisplay() {
        this.animation = new PIXI.AnimatedSprite(gameEngine.playerSheet.standSouth)
        this.animation.anchor.set(0.5)
        this.animation.animationSpeed = .1
        this.animation.loop = false
        this.animation.width = this.animationWidth
        this.animation.height = this.animationHeight

        this.container.x = this.location.x
        this.container.y = this.location.y

        if (this.showHitBoxes && this.player) {
            this.hitBox.beginFill(0xFFFF00, 0)
            this.hitBox.lineStyle(1, 0xFF0000)
            this.hitBox.drawRect(this.hitBoxData.x, this.hitBoxData.y, 
                                  this.hitBoxData.width, this.hitBoxData.height)
            this.hitBox.endFill()
        }
                            
        this.container.addChild(this.animation)
        this.container.addChild(this.hitBox)
        return this.container
    }

    display() {
        // Updates the display container each game frame
        this.container.x = this.location.x
        this.container.y = this.location.y
        if (this.pause) {
            const animationObject = this.container.getChildAt(0)
            // animationObject.stop()
            this.animation.stop()
        }
        this.animation.play()
    }

    update() {
        super.update()
        if (this.pause) return
        this.checkKeyPresses()
        this.checkEdges()
        this.checkAnimation()
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
            this.stop()
            if (this.shot) return
            this.shot = true
            this.lives --
            window.world.shootBullet(this.location)
        }
    }

    checkWin() {
        // checks wether the man has crossed the sucess line
        if (this.location.y < gameEngine.height*gameEngine.successLine) {
            this.hasWon = true
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
            this.animation.animationSpeed = this.animationSpeed()
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

    animationSpeed() {
        return this.velocity.length() * 0.05
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

    checkCollision(data) {
        // Loop through all data provided and check if this hitbox
        // overlaps with data's hitbox
        const ownGlobalPos = this.container.toGlobal(new PIXI.Point(0,0))
        const ownXpos = ownGlobalPos.x - -this.hitBoxData.x
        const ownYpos = ownGlobalPos.y + this.hitBoxData.y
        const ownW = this.hitBoxData.width
        const ownH = this.hitBoxData.height

        for (let i=0; i<data.length; i++) {
            const obj = data[i]
            if (obj === this) continue
            if (obj.successLine) continue
            if (!obj.dead) continue
            const hitBoxData = obj.hitBoxData
            const globalPos = obj.container.toGlobal(new PIXI.Point(0,0))
            const xPos = globalPos.x + hitBoxData.x
            const yPos = globalPos.y + hitBoxData.y
            const w = hitBoxData.width
            const h = hitBoxData.height
            
            const hit = rectanglesCollide(ownXpos, ownYpos, ownW, ownH,
                              xPos, yPos, w, h)
            
            if (hit) {
                this.topSpeed = this.slowTopSpeed
                return 
            } else {
                this.topSpeed = this.normalTopSpeed
            }
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
        this.location.x = this.startingLocationX
        this.location.y = this.startingLocationY
        this.acceleration = new Vector(0,0)
        this.velocity = new Vector(0,0)
        this.dead = false
    }
    
}