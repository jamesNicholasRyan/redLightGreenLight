// This class prepresents the important victory line that the 
// player must cross to win the game

// crimson - #DC143C

import * as PIXI from 'pixi.js'
  
export default class SuccessLine {
    constructor(x, y, l, h) {
        this.ratio = window.world.ratio
        this.x = x *this.ratio
        this.y = y *this.ratio
        this.l = l
        this.h = h
        this.graphics = new PIXI.Graphics()
        this.successLine = true
    }

    createDisplay() {
        this.graphics.beginFill(0x990000)
        this.graphics.drawRect(this.x, this.y, this.l, this.h)
        this.graphics.endFill()
        return this.graphics
    }

    display() {
        this.graphics.beginFill(0x990000)
        this.graphics.drawRect(this.x, this.y, this.l, this.h)
        this.graphics.endFill()
        this.graphics.alpha = 0.7
    }

    update() {

    }
}