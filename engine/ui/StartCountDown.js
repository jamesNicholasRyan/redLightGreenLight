// This is the class for displaying the different counters

import * as PIXI from 'pixi.js'
import LevelTimer from "./LevelTimer.js"


export default class StartCountDownTimer extends LevelTimer {
    constructor(x, y, w, h, fill, fontSize, fontFill) {
        super(x, y, w, h, fill, fontSize, fontFill)
        this.counter = 0
    }

    display() {
        this.text.alpha = 0
        if (window.world.isLevelActive) return
        this.graphics.beginFill(this.fill)
        this.text.alpha = 1
        this.text.text = this.counter
        this.text.anchor.set(0.5)
        this.text.x = this.x
        this.text.y = this.y
    }

    updateTime() {
        this.counter = window.girl.countdown
    }

}