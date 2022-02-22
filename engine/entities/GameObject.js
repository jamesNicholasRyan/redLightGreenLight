// game objects are the visual elements that will make up the game engine, 
// except for the UI/menu elements. 

import * as PIXI from 'pixi.js'
import Vector from '../utils/vector'

export default class GameObject {

    constructor(x, y, a, b, fill) {
        this.ratio = window.world.ratio
        this.location = new Vector(x, y)
        this.a = a *this.ratio
        this.b = b *this.ratio
        this.acceleration = new Vector(0,0)
        this.velocity = new Vector(0,0)
        this.topSpeed = 10 *this.ratio
        this.graphics = new PIXI.Graphics()
        this.container = new PIXI.Container()
        this.fill = fill
        this.originalFill = this.fill
        this.active = false
        this.pause = false
    }

    // Initialises the graphics of the object when added to engine
    createDisplay() {
        this.graphics.beginFill(this.fill)
        this.graphics.drawCircle(this.location.x, this.location.y, this.a)
        this.graphics.endFill()
        return this.graphics
    }

    // updates game object graphics
    display() {
        this.graphics.beginFill(this.fill)
        this.graphics.drawCircle(this.location.x, this.location.y, this.a)
        this.graphics.endFill()
        // return this.graphics
    }

    update() {
        if (!this.active) return
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

    gradient(from, to, x1, x2, y1, y2) {
        const c = document.createElement("canvas")
        const ctx = c.getContext("2d")
        const grd = ctx.createLinearGradient(x1,x2,y1,y2)
        grd.addColorStop(0, 'red')
        grd.addColorStop(1, 'blue')
        ctx.fillStyle = grd
        ctx.fillRect(x1,x2,y1,y2)
        return new PIXI.Texture.from(c)
    }

}