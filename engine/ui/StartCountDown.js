// This is the class for displaying the different counters

import * as PIXI from 'pixi.js'
import LevelTimer from "./LevelTimer.js"


export default class StartCountDownTimer extends LevelTimer {
    constructor(x, y, w, h, fill) {
        super(x, y, w, h, fill)
        this.counter = 0
    }

    display() {
        this.text.alpha = 0
        if (window.world.isLevelActive) return
        this.text.alpha = 1
        this.text.text = this.counter
        this.text.x = this.x
        this.text.y = this.y
    }

    updateTime() {
        this.counter = window.girl.startCounter
    }

}