// ui elements are the anchored buttons, menus and displays that 'stick' to certain
// points on the screen

import * as PIXI from 'pixi.js'
// import Vector from '../utils/vector'

export default class UiElement {

    constructor(x, y, w, h, fill) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.fill = fill
        this.graphics = new PIXI.Graphics()
        this.isSprite = false
        this.active = false
        this.pause = false
    }

    display() {

    }

    update() {
        if (this.pause) return

    }

    action() {

    }

    activate() {

    }

    deactivate() {

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