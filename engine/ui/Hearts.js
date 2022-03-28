import UiElement from "./UiElement"
import * as PIXI from 'pixi.js'

import fullHearts from '../assets/hearts_full.png'
import emptyHearts from '../assets/hearts_empty.png'
import oneHeart from '../assets/hearts_1.png'
import twoHearts from '../assets/hearts_2.png'


export default class Hearts extends UiElement {
    constructor(x, y, w, h, fill, name) {
        super(x, y, w, h, fill, name)
        this.active = false
        this.fullTexture = new PIXI.Texture.from(fullHearts)
        this.emptyTexture = new PIXI.Texture.from(emptyHearts)
        this.oneTexture = new PIXI.Texture.from(oneHeart)
        this.twoTexture = new PIXI.Texture.from(twoHearts)
        this.container = new PIXI.Container()

        this.fullSprite = ''
        this.emptySprite = ''
        this.oneSprite = ''
        this.twoSprite = ''
    }

    createDisplay() {
        this.fullTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
        this.emptyTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
        this.oneTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
        this.twoTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

        this.fullSprite = new PIXI.Sprite(this.fullTexture)
        this.emptySprite = new PIXI.Sprite(this.emptyTexture)
        this.oneSprite = new PIXI.Sprite(this.oneTexture)
        this.twoSprite = new PIXI.Sprite(this.twoTexture)
        
        const arrayOfSprites = [this.fullSprite, this.emptySprite, this.oneSprite, this.twoSprite]
        arrayOfSprites.forEach((sprite) => {
            sprite.anchor.set(0.5)
            sprite.position.x = this.x
            sprite.position.y = this.y
            sprite.width = this.w
            sprite.height = this.h
            sprite.alpha = 1
            this.container.addChild(sprite)
        })
        return this.container
    }

    display() {
        this.showCorrectHeartSprite()
    }

    showCorrectHeartSprite() {
        if (window.man1.lives == 3) {
            this.fullSprite.alpha = 1
            this.emptySprite.alpha = 0
            this.oneSprite.alpha = 0
            this.twoSprite.alpha = 0
        } else if (window.man1.lives == 2) {
            this.fullSprite.alpha = 0
            this.emptySprite.alpha = 0
            this.oneSprite.alpha = 0
            this.twoSprite.alpha = 1
        } else if (window.man1.lives == 1) {
            this.fullSprite.alpha = 0
            this.emptySprite.alpha = 0
            this.oneSprite.alpha = 1
            this.twoSprite.alpha = 0
        } else if (window.man1.lives == 0) {
            this.fullSprite.alpha = 0
            this.emptySprite.alpha = 1
            this.oneSprite.alpha = 0
            this.twoSprite.alpha = 0
        }
    }
}