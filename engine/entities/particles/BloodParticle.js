// Specific logic for blood particle

import randomNumGen from "../../utils/randomNumberGen";
import Vector from "../../utils/vector";
import Particle from "./Particle";

export default class BloodParticle extends Particle {
    constructor(x, y, acceleration, speed, topSpeed, life, fill) {
        super(x, y, acceleration, speed, topSpeed, life, fill)
        this.originalLocationX = x
        this.originalLocationY = y
        this.randomObj = {
            min: 25,
            max: randomNumGen(30, 50),
            lifeRandom: randomNumGen(0.1, 0.25)
        }
    }

    update() {
        super.update()
        if (this.pause) return
        this.life += this.randomObj.lifeRandom
        this.applyGravity()
        this.stopBlood()
    }

    stopBlood() {
        // This methods checks wether the blood has hit the floor yet
        // stopping it if that is the case
        const randomDist = randomNumGen(this.randomObj.min, this.randomObj.max)
        if (this.location.y >= this.originalLocationY + randomDist) {
            this.width = this.life * 2
            this.alpha = 0.6
            this.pause = true
        }
    }

    applyGravity() {
        const gravity = new Vector(0, 0.5)
        this.applyForce(gravity)
    }
}