// This fle contains logic for the button classes
import * as PIXI from 'pixi.js'
import World from '../../src/world'


export default class Button {
    constructor(name, x, y, w, h, fill, text, action) {
        this.name = name
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.fill = fill
        this.alpha = 0
        this.graphics = new PIXI.Graphics()
        this.active = true
        this.chosenAction = action
        this.text = new PIXI.Text(`${text}`, {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'})
    }

    createDisplay() {
        this.display()
        return this.graphics
    }
    
    display() {
        this.graphics.beginFill(this.fill)
        this.graphics.drawRect(this.x, this.y, this.w, this.h)
        this.graphics.endFill()
    }

    update() {

    }

    action(){
        this.chosenAction()
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