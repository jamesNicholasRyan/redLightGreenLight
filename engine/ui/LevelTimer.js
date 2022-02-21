// This is the class for displaying the different counters

import * as PIXI from 'pixi.js'
import UiElement from "./UiElement.js"


export default class LevelTimer extends UiElement {
    constructor(x, y, w, h, fill, fontSize, fontFill) {
        super(x, y, w, h, fill)
        this.counter = 0
        this.text = new PIXI.Text(this.counter, {fontFamily : 'Arial', fontSize: fontSize, fill : fontFill, align : 'center'})
        this.container = new PIXI.Container()
        this.graphics = new PIXI.Graphics()
    }

    createDisplay() {
        this.display()
        this.container.addChild(this.graphics)
        this.container.addChild(this.text)
        return this.container
    }

    display() {
        this.graphics.beginFill(this.fill)
        this.graphics.drawRect(this.x-5, this.y-2.5, this.w, this.h)
        this.graphics.endFill()
        this.text.text = this.counter
        this.text.x = this.x
        this.text.y = this.y
    }

    update() {
        this.updateTime()
    }

    updateTime() {
        this.counter = this.timeToTextConverter(window.girl.levelCounter)   
    }

    timeToTextConverter(counter) {
        // This method converts integer number into minutes and seconds
        let minSecArray = []
        let secs = String(counter%60)
        let mins = ''
        if (secs < 10) secs = '0' + secs
        if (counter >= 60) {
            mins = Math.floor(counter/60)
            if (mins < 10) mins = '0' + String(mins)
        } else {
            mins = '00'
        }
        minSecArray.push(mins, secs)
        return minSecArray.join(':')
    }
}