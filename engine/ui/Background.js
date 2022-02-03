// Background class to display background sprites
import UiElement from "./UiElement"
import * as PIXI from "pixi.js"


export default class Background extends UiElement {
    constructor(x, y, w, h, fill, sprite) {
        super(x, y, w, h, fill)
        this.x = x
        this.y = y
        this.fill = fill
        this.active = true
        this.sprite = ''
        this.texture = new PIXI.Texture.from(sprite)
    }

    update() {
        super.update()
    }

    createDisplay() {
        this.sprite = new PIXI.Sprite(this.texture)
        this.fullDisplay()
        this.isSprite = true
        return this.sprite
    }

    display() {
        if (!this.active) return this.sprite.alpha = 0
        this.fullDisplay()
    }

    fullDisplay() {
        this.sprite.position.x = this.x
        this.sprite.position.y = this.y
        this.sprite.width = 1000
        this.sprite.height = 900
        this.sprite.alpha = 1
    }
}
