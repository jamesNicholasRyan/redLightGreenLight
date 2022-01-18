import * as PIXI from 'pixi.js'


export default class Menu {
    constructor(name, w, h, fill, active) {
        this.name = name
        this.width = w
        this.height = h
        this.fill = fill
        this.alpha = 0
        this.graphics = new PIXI.Graphics()
        this.container = new PIXI.Container()
        this.active = active
        this.fadeSpeed = 0.05
    }

    createDisplay() {
        this.graphics.drawRect(0,0, this.width, this.height, this.fill)
        this.container.addChild(this.graphics)
        return this.container
    }
    
    display() {
        this.graphics.beginFill(this.fill, this.alpha)
        this.graphics.drawRect(0,0, this.width, this.height)
        this.graphics.endFill()
    }

    update() {
        if (this.active) {
            // console.log('fading IN')
            this.fadeIn()
        } else {
            // console.log('fading OUT')
            this.fadeOut()
        }
    }

    fadeIn() {
        if (this.alpha >= 1) return this.alpha=1
        this.alpha += this.fadeSpeed
    }

    fadeOut() {
        if (this.alpha <= 0) return this.alpha=0
        this.alpha -= this.fadeSpeed
    }

    checkMouseOver(mousePosition) {
        if (this.isSprite) { // If this element is a sprite, use the Sprite.containsPoint()
             return this.sprite.containsPoint(mousePosition)
        }
        // Checks whether a given mouse position is over the current UI element
        if ((mousePosition.x > this.x) && (mousePosition.x < this.x+this.w) &&
            (mousePosition.y > this.y) && (mousePosition.y < this.y+this.h)) {
            return true
        }
        return false
    }
}