// This file contains all logic for the bullet class, 
// which gets activated when a man object dies

import Vector from "../../utils/vector"
import GameObject from "../GameObject"

export default class Bullet extends GameObject {
    constructor(x, y, target, w, h, fill) {
        super(x, y, fill)
        this.target = target
        this.rotation = 0
        this.distanceToTarget = 0
        this.shot = false
        this.width = w
        this.initialHeight = h
        this.height = h
        this.bulletSpeed = 150   *this.ratio
        this.fadeSpeed = 0.1
        this.life = 100
    }

    init() {
        // when the bullet object is created, run this function to work out
        // the rotation & distance to the target man
        this.active = true
        this.distanceToTarget = Vector.dist(this.target, this.location)
        this.rotation = Vector.angle(this.location, this.target) *-1    // radians? 
    }

    createDisplay() {
        this.display()
        return this.graphics
    }

    display() {
        this.graphics.beginFill(0xffffff)
        this.graphics.position.x = this.location.x
        this.graphics.position.y = this.location.y
        this.graphics.drawRect(-2.5, 0, this.width, this.height)
        this.graphics.rotation = this.rotation - (Math.PI/2)   // degrees?
        this.graphics.endFill()
    }

    update() {
        this.life--
        if (!this.active) return
        if (this.shot) {
            this.fade()
            return
        }
        this.shoot()
    }

    shoot() {
        // This function rapidly increases the rectangle's
        // height until it reaches the target
        // console.log('HEIGHT: ', this.height + 'DISTANCE: ', this.distanceToTarget)
        if (this.height + this.bulletSpeed >= this.distanceToTarget) {
            this.height = this.distanceToTarget
            window.world.bloodSplatter(this.target, this.rotation)
            return this.shot = true
        }
        this.height += this.bulletSpeed
    }

    fade() {
        this.graphics.alpha -= this.fadeSpeed
    }

    garbageCollection() {
        // If this life is < 0, return true
        return this.life < 0
    }
}