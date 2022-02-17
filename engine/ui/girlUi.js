import UiElement from "./UiElement.js"
import * as PIXI from 'pixi.js'


export default class GirlUi extends UiElement {
    constructor(x, y, w, h, fill) {
        super(x, y, w, h)
        this.container = new PIXI.Container()
        this.animationWidth = 52
        this.animationHeight = 72
    }

    createDisplay() {
        this.animation = new PIXI.AnimatedSprite(gameEngine.headSheet.headForward)
        this.animation.anchor.set(0.5)
        this.animation.animationSpeed = 1
        this.animation.loop = true
        this.animation.width = this.animationWidth
        this.animation.height = this.animationHeight

        this.container.x = this.x
        this.container.y = this.y

        this.container.addChild(this.animation)
        return this.container 
    }

    display() {
        this.animation.play()
    }

    update() {
        this.checkAnimation()
    }

    checkAnimation() {
        if (window.gameEngine.redLight) {
            this.animation.animationSpeed = 1
            this.animation.textures = gameEngine.headSheet["headForward"]
            this.animation.play()
        } else {
            this.animation.textures = gameEngine.headSheet["headBackwards"]
        }
    }


}