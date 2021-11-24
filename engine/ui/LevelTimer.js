// This is the class for displaying the different counters

import * as PIXI from 'pixi.js'
import UiElement from "./UiElement.js"


export default class LevelTimer extends UiElement {
    constructor(x, y, w, h, fill) {
        super(x, y, w, h, fill)
        this.counter = 0
        this.text = new PIXI.Text(this.counter, {fontFamily : 'Arial', fontSize: 60, fill : 0x000000, align : 'center'})
        
    }

    createDisplay() {
        this.display()
        return this.text
    }

    display() {
        // this.text.destroy()
        this.text.text = this.counter
        this.text.x = this.x
        this.text.y = this.y
    }

    update() {
        this.updateTime()
    }

    updateTime() {
        this.counter = window.girl.levelCounter
    }
}