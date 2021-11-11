// This file contains all logic for the Game Over Pop Up
import UiElement from "./UiElement.js"


export default class GameOverPopUp extends UiElement {

    constructor(x, y, w, h, fill) {
        super(x, y, w, h, fill)
        this.x = x
        this.y = y
        this.fill = fill
        this.active = false
    }

    createDisplay() {
        this.fullDisplay()
        return this.graphics
    }

    display() {
        if (!this.active) return
        this.fullDisplay()
    }

    fullDisplay() {
        this.drawRectangle(this.x, this.y, this.w, this.h, this.fill)
    }

    drawRectangle(x, y, w, h, color) {
        this.graphics.beginFill(color)
        this.graphics.drawRect(x, y, w, h)
        this.graphics.endFill()
    }

    // LOGIC
    update() {
        this.checkIfGameIsOver()
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
        console.log("POP UP CLICKED!")
        window.world.resetGame()
        this.active = false
    }
}