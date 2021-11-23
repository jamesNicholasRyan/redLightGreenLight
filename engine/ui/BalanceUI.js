// This is the class for the Balance Ball UI
import UiElement from "./UiElement.js"


export default class BalanceUI extends UiElement {
    constructor(x, y, w, h, fill, ballFill, X, v, min, max) {
        super(x, y, w, h, fill)
        // VISUAL
        this.ballFill = ballFill
        this.ballPosX = x + w/2
        this.ballPosY = y + (h/2)
        
        // LOGIC
        this.position = x + w/2
        this.oringinalPosition = x + w/2
        this.velocity = v // TODO: randomize it OR Randomize applyforce?
        this.acceleration = 0
        this.topSpeedMax = 10
        this.topSpeedMin = -10
        this.forceStrength = 2
        this.minLimit = min
        this.maxLimit = max
        this.randomVelChance = 400
        this.lostBalance = false
        this.active = false
    }

    createDisplay() {
        this.fullDisplay()
        return this.graphics
    }

    display() {
        if (!this.active) return
        this.fullDisplay()
    }

    fullDisplay() {
        this.drawRectangle(this.x, this.y, this.w, this.h, this.fill)
        this.drawBall(this.position, this.ballPosY, 25, this.ballFill)
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
        if (this.active) {
            this.randomVel()
            this.move()
            this.checkKeyPresses()
            this.checkLimits()
            // console.log(this.velocity)
            // console.log(this.position)
        } else {
            return
        }
    }

    move() {
        this.velocity += this.acceleration
        this.limitVelocity()
        this.position += this.velocity
        this.acceleration = 0
    }

    applyForce(force) {
        // this.acceleration.add(force)
        this.acceleration += force
    }

    randomVel() {   
        // This function makes the velocity of the ball a but random on random occassions
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
        // Random velocity between -10 and 10
        const randForce = Math.random() * (5 - -5) + -5
        this.applyForce(randForce)
    }

    deactivate() {
        this.active = false
        this.position = this.oringinalPosition
        this.velocity = 0
        this.acceleration = 0
    }

    checkLimits() {
        if ((this.position > this.maxLimit) || (this.position < this.minLimit)) {
            this.lostBalance = true
            this.deactivate()
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
        // If the blanacing mini game is lost, the man is reset
        // console.log(this.lostBalance)
        if (this.lostBalance) {
            window.man1.dead = true
        }
    }
}