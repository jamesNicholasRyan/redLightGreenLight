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
        this.animation = new PIXI.AnimatedSprite(gameEngine.headSheet.headBackwards)
        this.animation.anchor.set(0.5)
        this.animation.animationSpeed = 0.2
        this.animation.loop = true
        this.animation.width = this.animationWidth
        this.animation.height = this.animationHeight

        this.container.x = this.x
        this.container.y = this.y

        this.container.addChild(this.animation)
        return this.container 
    }

    display() {
    }

    update() {
        if (!window.world.stateService.state.matches('playing')) return this.animation.stop()
        this.checkAnimation()
    }

    checkAnimation() {
        if (window.gameEngine.redLight) {
            if (this.animation.playing) return
            this.animation.animationSpeed = 0.01
            this.animation.textures = gameEngine.headSheet["headForward"]
            this.animation.play()
        } else {
            this.animation.textures = gameEngine.headSheet["headBackwards"]
        }
    }


}