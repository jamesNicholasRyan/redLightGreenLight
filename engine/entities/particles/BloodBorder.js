// File containing class logic for the blood border

import * as PIXI from 'pixi.js'

import bloodBorder from '../../assets/border_blood.png'


export default class BloodBorder {
    constructor(fadeSpeed) {
        this.name = 'bloodBorder'
        this.borderTexture = new PIXI.Texture.from(bloodBorder)
        this.container = new PIXI.Container()
        this.graphics = new PIXI.Graphics()
        this.sprite = ''
        this.spriteAlpha = 0
        this.fadeSpeed = fadeSpeed
        this.active = false
    }
    
    createDisplay() {
        this.sprite = new PIXI.Sprite(this.borderTexture)
        this.sprite.position.x = 0
        this.sprite.position.y = 0
        this.sprite.width = window.world.worldWidth
        this.sprite.height = window.world.worldWidth*0.9
        this.sprite.alpha = this.spriteAlpha
        this.container.addChild(this.sprite)
        return this.container
    }

    display() {
        this.sprite.alpha = this.spriteAlpha
    }

    update() {
        if (this.active) {
            this.spriteAlpha = 1
            this.active = false
        } else if (!window.man1.dead) {
            this.fadeOut(this.fadeSpeed)
        }

    }

    drawBloodBorder() {
        this.sprite.alpha = this.spriteAlpha
    }

    fadeIn(speed) {
        if (this.spriteAlpha >= 1) return this.spriteAlpha=1
        this.spriteAlpha += speed
    }

    fadeOut(speed) {
        if (this.spriteAlpha <= 0) return this.spriteAlpha=0
        this.spriteAlpha -= speed
    }

}