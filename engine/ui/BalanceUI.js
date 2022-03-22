// This is the class for the Balance Ball UI
import UiElement from "./UiElement.js"
import * as PIXI from 'pixi.js'

import balancingMan from '../assets/balance_ui_man.png'
import balancingLegs from '../assets/balance_ui_legs.png'


export default class BalanceUI extends UiElement {
    constructor(x, y, w, h, fill, ballFill, v) {
        super(x, y, w, h, fill)
        this.ratio = window.world.ratio
        // VISUAL
        this.ballFill = ballFill
        this.ballPosX = (this.x + this.w/2)
        this.ballPosY = this.y + (this.h/2)
        this.container = new PIXI.Container()
        this.spriteWidth = 30 * this.ratio
        this.spriteHeight = 50 * this.ratio
        
        // LOGIC
        this.position = (this.x + this.w/2)
        this.oringinalPosition = (this.x + this.w/2)
        this.velocity = v // TODO: randomize it OR Randomize applyforce?
        this.acceleration = 0
        this.topSpeedMax = 10  *this.ratio
        this.topSpeedMin = -10 *this.ratio
        this.forceStrength = 2 *this.ratio
        this.minLimit = this.x
        this.maxLimit = this.x + this.w 
        this.randomVelChance = 400
        this.lostBalance = false
        this.active = false
        this.rotation = 0
        this.pauseBalance = false
    }

    createDisplay() {
        this.texture = new PIXI.Texture.from(balancingMan)
        this.spriteBody = new PIXI.Sprite(this.texture)
        this.legsTexture = new PIXI.Texture.from(balancingLegs)
        this.spriteLegs = new PIXI.Sprite(this.legsTexture)
        this.spriteBody.width = this.spriteWidth
        this.spriteBody.height = this.spriteHeight
        this.spriteBody.anchor.set(0.5, 0.9)
        this.fullDisplay()
        return this.container
    }

    display() {
        if (!this.active) {
            this.graphics.visible = false
            this.container.visible = false
            return
        }
        this.graphics.visible = true
        this.container.visible = true
        this.fullDisplay()
    }

    fullDisplay() {
        if (window.man1) {
            this.x = window.man1.location.x + 70 * this.ratio
            this.y = window.man1.location.y + 20 * this.ratio
        }
        this.container.x = this.x
        this.container.y = this.y
        this.drawRotationMan()
        this.container.addChild(this.spriteBody)
        this.container.addChild(this.spriteLegs)
    }

    drawRotationMan() {
        this.spriteLegs.width = this.spriteWidth
        this.spriteLegs.height = this.spriteHeight + (this.spriteHeight/2)
        this.spriteLegs.y = -50 * this.ratio
        this.spriteLegs.x = -15 * this.ratio
        this.spriteBody.angle = this.calculateRotation()
    }

    drawRectangle(x, y, w, h, color) {
        this.graphics.beginFill(color)
        this.graphics.drawRect(x, y, w, h)
        this.graphics.endFill()
    }

    drawBall(x, y, r, color) {
        this.graphics.beginFill(color)
        this.graphics.drawCircle(x, y, r)
        this.graphics.endFill()
    }

    // LOGIC
    update() {
        super.update()
        if (this.pauseBalance || this.pause) return
        if (this.active) {
            this.randomVel()
            this.move()
            this.checkKeyPresses()
            this.checkLimits()
        } else {
            return
        }
    }

    calculateRotation() {
        // Calculate roation based on the linear position of original ball
        const linearWidth = this.maxLimit - this.minLimit
        const ratio = linearWidth / 180
        const degrees = this.position / ratio
        return degrees + 20
    }

    move() {
        this.velocity += this.acceleration
        this.limitVelocity()
        this.position += this.velocity
        this.acceleration = 0
        this.rotation += this.position *0.01
    }

    applyForce(force) {
        this.acceleration += force
    }

    randomVel() {   
        // This function makes the velocity of the ball a bit random on random occassions
        const random = Math.floor(Math.random() * 400)     // if zero - do random vel
        if (random > 30) return
        const randNegPos = Math.floor(Math.random() * 1)   // 0 is positive, 1 is negative
        if (randNegPos > 0) return this.velocity += this.forceStrength
        this.velocity -= this.forceStrength
    }

    limitVelocity() {
        if (this.velocity > this.topSpeedMax) this.velocity = this.topSpeedMax
        if (this.velocity < this.topSpeedMin) this.velocity = this.topSpeedMin
    }

    action() {
        // what happens when this element is clicked...
        return
    }

    activate() {
        this.active = true
        this.lostBalance = false
        // Random velocity between -10 and 10...
        const max = 4 *this.ratio
        const min = -4 *this.ratio
        const randForce = Math.random() * (max - min) + min
        this.applyForce(randForce)
    }

    reset() {
        this.active = false
        this.position = this.oringinalPosition
        this.velocity = 0
        this.acceleration = 0
    }

    pauseForCertainTime(time) {
        this.pauseBalance = true
        setTimeout(() => {
            this.pauseBalance = false
            this.reset()
        }, [time])
    }

    checkLimits() {
        if ((this.position > this.maxLimit) || (this.position < this.minLimit)) {
            window.man1.toBeShot = true
            window.borderBlood.active = true
            this.pauseForCertainTime(2000)
        } else {
            this.lostBalance = false
        }
    }

    checkKeyPresses () {
        if (window.gameEngine.arrowLeft) {
            this.applyForce(-this.forceStrength)
        } else if (window.gameEngine.arrowRight) {
            this.applyForce(this.forceStrength)
        }
    }

    checkManBalance() {
        // Activates the balance mini game if the man has started 'balancing'
        if (window.man1.balancing) return true
        return false
    }

    checkLostBalance() {
        // If the blanacing mini game is lost, the man is shot
        if (this.pauseBalance) return
        if (this.lostBalance) {
            window.man1.toBeShot = true
        }
    }
}