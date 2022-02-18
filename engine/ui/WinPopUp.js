// This file contains all logic for the Game Over Pop Up
import GameOverPopUp from './GameOverPopUp'
import * as PIXI from 'pixi.js'

import winButton from '../assets/win_button.png'


export default class WinPopUp extends GameOverPopUp {

    constructor(x, y, w, h, fill) {
        super(x, y, w, h, fill)
        this.texture = new PIXI.Texture.from(winButton)
    }

    // LOGIC
    update() {
        this.checkIfGameIsWon()
    }

    checkIfGameIsWon() {
        if (window.world.gameWin) {
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
        // What happens when this element is clicked on
        window.world.resetGame('LEVEL')
        this.active = false
    }
}