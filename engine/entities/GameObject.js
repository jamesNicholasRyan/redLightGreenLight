// game objects are the visual elements that will make up the game engine, 
// except for the UI/menu elements. 

import * as PIXI from 'pixi.js'
import Vector from '../utils/vector'

export default class GameObject {

    constructor(x, y, a, b, fill) {
        this.location = new Vector(x,y)
        this.a = a,
        this.b = b,
        this.acceleration = new Vector(0,0)
        this.velocity = new Vector(0,0)
        this.topSpeed = 10
        this.graphics = new PIXI.Graphics()
        this.fill = fill
        this.originalFill = this.fill
    }

    // displays the gameobject
    display() {
        this.graphics.beginFill(this.fill)
        this.graphics.drawCircle(this.location.x, this.location.y, this.a)
        this.graphics.endFill()
        return this.graphics
    }

    update() {
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
}