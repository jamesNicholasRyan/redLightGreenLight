// this is the class for the red light AND green light

import UiElement from "./UiElement.js"


export default class Lights extends UiElement {
    constructor(x, y, w, h, fill) {
        super(x, y, w, h, fill)
        this.offsetX = this.x + this.w/2
        this.offsetY1 = this.y + (this.h * 0.25)
        this.offsetY2 = this.y + (this.h * 0.75)
        this.red = 0xFF0000
        this.green = 0x00FF00
    }

    createDisplay() {
        this.display()
        return this.graphics 
    }

    display() {
        // this.graphics.beginFill(this.fill)
        // this.graphics.drawRect(this.x, this.y, this.w, this.h)
        // this.graphics.endFill()

        // if (window.gameEngine.redLight) {
        //     this.drawLight(this.offsetX, this.offsetY1, this.red)
        // } else {
        //     this.drawLight(this.offsetX, this.offsetY2, this.green)
        // }
    }

    drawLight(x, y, color) {
        const ratio = window.world.ratio
        this.graphics.beginFill(color)
        this.graphics.drawCircle(x, y, 30 *ratio)
        this.graphics.endFill()
    }

}