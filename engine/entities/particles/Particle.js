// Particle class for building various particle systems

import * as PIXI from 'pixi.js'
import Vector from "../../utils/vector"

export default class Particle {
    constructor(x, y, acceleration, speed, topSpeed, life, fill) {
        this.location = new Vector(x, y)
        this.acceleration = acceleration
        this.velocity = new Vector(0,0)
        this.topSpeed = topSpeed
        this.speed = speed
        this.life = life
        this.width = life
        this.pause = false

        this.graphics = new PIXI.Graphics()
        this.fill = fill
        this.alpha = 1
    }

    createDisplay() {
        this.display()
        return this.graphics
    }

    display() {
        this.graphics.beginFill(this.fill, this.alpha)
        this.graphics.drawEllipse(this.location.x, this.location.y, this.width, this.life)
        this.graphics.endFill()
    }

    update() {
        // if (!this.active) return
        if (this.pause) return
        this.move()
    }

    move() {
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.topSpeed)
        this.location.add(this.velocity)
        this.acceleration.multiply(0)
    }

    applyForce(force) {
        this.acceleration.add(force)
    }

    garbageCollection() {
        // If this life is < 0, return true
        return this.life < 0
    }
 }