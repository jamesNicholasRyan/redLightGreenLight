import * as PIXI from 'pixi.js'


export default class Logo {
    constructor(name, x, y, w, h, png) {
        this.name = name
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.alpha = 0
        this.graphics = new PIXI.Graphics()
        this.texture = new PIXI.Texture.from(png)
        this.active = true
    }

    createDisplay() {
        this.sprite = new PIXI.Sprite(this.texture)
        this.display()
        this.graphics.addChild(this.sprite)
        return this.graphics
    }
    
    display() {
        this.sprite.anchor.set(0.5)
        this.sprite.position.x = this.x
        this.sprite.position.y = this.y
        this.sprite.alpha = 1
    }

    update() {
        if (this.active) {
            this.sprite.alpha = 1
        } else {
            this.sprite.alpha = 0
        }
    }
}