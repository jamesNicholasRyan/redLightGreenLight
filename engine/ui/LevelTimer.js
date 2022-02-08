// This is the class for displaying the different counters

import * as PIXI from 'pixi.js'
import UiElement from "./UiElement.js"


export default class LevelTimer extends UiElement {
    constructor(x, y, w, h, fill) {
        super(x, y, w, h, fill)
        this.counter = 0
        this.text = new PIXI.Text(this.counter, {fontFamily : 'Arial', fontSize: 40, fill : 0x000000, align : 'center'})
        
    }

    createDisplay() {
        this.display()
        return this.text
    }

    display() {
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