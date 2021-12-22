import * as PIXI from 'pixi.js'


export default class Menu {
    constructor(w, h, fill, alpha) {
        this.width = w
        this.height = h
        this.fill = fill
        this.alpha = alpha
        this.graphics = new PIXI.Graphics()
        this.active = true
    }

    createDisplay() {
        this.graphics.drawRect(0,0, this.width, this.height, this.fill)
        return this.graphics
    }
    
    display() {
        this.graphics.beginFill(this.fill, this.alpha)
        this.graphics.drawRect(0,0, this.width, this.height)
        this.graphics.endFill()
    }

    update() {
        if (this.active) {
            this.fadeIn()
        }
    }

    fadeIn() {
        if (this.alpha <= 0) return
        this.alpha += 0.01
    }

    fadeOut() {
        if (this.alpha >= 1) return
        this.alpha -= 0.01
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