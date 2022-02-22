// This file contains all logic for the Game Over Pop Up
import UiElement from "./UiElement.js"
import * as PIXI from 'pixi.js'

import gameOverButton from '../assets/game_over_button.png'


export default class GameOverPopUp extends UiElement {

    constructor(x, y, w, h, fill, name) {
        super(x, y, w, h, fill, name)
        this.x = x
        this.y = y
        this.fill = fill
        this.active = false
        this.sprite = ''
        this.texture = new PIXI.Texture.from(gameOverButton)
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
        this.sprite.anchor.set(0.5)
        this.sprite.position.x = this.x
        this.sprite.position.y = this.y
        this.sprite.width = this.w
        this.sprite.height = this.h
        this.sprite.alpha = 1
    }

    // LOGIC
    update() {
    }

    checkIfGameIsOver() {
        if (window.world.gameOver) {
            this.activate()
            return
        }
    }

    action() {
        // What happens when this element is clicked on
        this.deactivate()
    }

    activate() {
        this.active = true
    }

    deactivate() {
        window.world.resetGame()
        this.active = false
    }
}