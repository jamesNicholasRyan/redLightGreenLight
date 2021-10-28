// this is the class for the red light AND green light

import UiElement from "./UiElement.js"


export default class Lights extends UiElement {
    constructor(x, y, w, h, fill) {
        super(x, y, w, h, fill)
    }

    createDisplay() {
        this.graphics.beginFill(this.fill)
        this.graphics.drawRect(this.x, this.y, this.w, this.h)
        this.graphics.endFill()


        const offsetX = this.x + this.w/2
        const offsetY1 = this.y + (this.h * 0.25)
        const offsetY2 = this.y + (this.h * 0.75)
        const red = 0xFF0000
        const green = 0x00FF00
        if (window.gameEngine.redLight) {
            this.drawLight(offsetX, offsetY1, red)
        } else {
            this.drawLight(offsetX, offsetY2, green)
        }
        
        // super.display()
        return this.graphics 
    }

    display() {
        this.graphics.beginFill(this.fill)
        this.graphics.drawRect(this.x, this.y, this.w, this.h)
        this.graphics.endFill()


        const offsetX = this.x + this.w/2
        const offsetY1 = this.y + (this.h * 0.25)
        const offsetY2 = this.y + (this.h * 0.75)
        const red = 0xFF0000
        const green = 0x00FF00
        if (window.gameEngine.redLight) {
            this.drawLight(offsetX, offsetY1, red)
        } else {
            this.drawLight(offsetX, offsetY2, green)
        }
        
        // super.display()
        // return this.graphics 
    }

    drawLight(x, y, color) {
        this.graphics.beginFill(color)
        this.graphics.drawCircle(x, y, 30)
        this.graphics.endFill()
    }
}