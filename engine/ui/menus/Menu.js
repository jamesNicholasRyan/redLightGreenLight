import * as PIXI from 'pixi.js'


export default class Menu {
    constructor(name, w, h, fill, active, parsedButtonData) {
        this.name = name
        this.width = w
        this.height = h
        this.fill = fill
        this.alpha = 0
        this.graphics = new PIXI.Graphics()
        this.buttonsGraphics = new PIXI.Graphics()
        this.container = new PIXI.Container()
        this.active = active
        this.fadeSpeed = 0.08
        this.buttonData = parsedButtonData
    }

    createDisplay() {
        this.graphics.drawRect(0,0, this.width, this.height, this.fill)
        this.drawButtons()
        this.container.addChild(this.graphics)
        this.container.addChild(this.buttonsGraphics)
        return this.container
    }
    
    display() {
        this.drawButtons()
        this.graphics.beginFill(this.fill, this.alpha)
        this.graphics.drawRect(0,0, this.width, this.height)
        this.graphics.endFill()
    }

    drawButtons() {
        if (!this.buttonData) return
        this.buttonsGraphics.alpha = this.alpha
        this.buttonData.forEach((data) => {
            this.buttonsGraphics.beginFill(data.fill)
            this.buttonsGraphics.drawRect(data.x, data.y, data.w, data.h)
            this.buttonsGraphics.endFill()
        })
    }

    update() {
        if (this.active) {
            // console.log('fading IN')
            this.fadeIn()
        } else {
            // console.log('fading OUT')
            this.fadeOut()
        }
    }

    fadeIn() {
        if (this.alpha >= 1) return this.alpha=1
        this.alpha += this.fadeSpeed
    }

    fadeOut() {
        if (this.alpha <= 0) return this.alpha=0
        this.alpha -= this.fadeSpeed
    }

    checkMouseOver(mousePosition) {

        let answer = false
        this.buttonData.forEach((button) => {
            // Checks whether a given mouse position is over the current button
            if ((mousePosition.x > button.x) && (mousePosition.x < button.x+button.w) && 
                (mousePosition.y > button.y) && (mousePosition.y < button.y+button.h)) {
                button.action()
                return answer = true
            }
        })

        if (this.isSprite) { // If this element is a sprite, use the Sprite.containsPoint()
             return this.sprite.containsPoint(mousePosition)
        }

        return answer
    }
}