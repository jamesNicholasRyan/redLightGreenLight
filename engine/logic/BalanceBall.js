// This is a class that deals with the balancing logic of the man

export default class BalanceBall {

    constructor(x, v) {
        this.position = x
        this.oringinalPosition = x
        this.velocity = v // TODO: randomize it
        this.acceleration = 0
        this.topSpeedMax = 10
        this.topSpeedMin = -10
        this.forceStrength = 2
        this.limit = 1000
        this.lostBalance = false
        this.active = false
    }

    update() {
        if (this.active) {
            this.move()
            this.checkKeyPresses()
            this.checkLimits()
            console.log(this.velocity)
            console.log(this.position)
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

    limitVelocity() {
        if (this.velocity > this.topSpeedMax) this.velocity = this.topSpeedMax
        if (this.velocity < this.topSpeedMin) this.velocity = this.topSpeedMin
    }

    activate() {
        this.active = true
        this.lostBalance = false
        // Rnadom velocity between -10 and 10
        const randForce = Math.random() * (10 - -10) + -10
        this.applyForce(randForce)
    }

    deactivate() {
        this.active = false
        this.position = this.oringinalPosition
        this.velocity = 0
        this.acceleration = 0
    }

    checkLimits() {
        if ((this.position > this.limit) || (this.position < 0)) {
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
}