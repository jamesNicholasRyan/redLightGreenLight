// This file controls all of the MOUSE interactions with the engine

import Vector from '../utils/vector'

export default class MouseController {

    constructor() {
        this.state = 'click'  // the current function of the mouse
        this.func = 'select'
        this.mouseObject = gameEngine.renderer.plugins.interaction.mouse.global
        this.backgroundContainers = []
    }

    init() {
        // this.arrowKeys()
    }

    mouseOver(object) {
        // checks wether mouse is over an object, 
        // returns: boolean
    
        // const mouseObject = gameEngine.renderer.plugins.interaction.mouse.global
        const mousePosition = new Vector(this.mouseObject.x, this.mouseObject.y)
        const subVec = Vector.subtract(object.location, mousePosition)
        const dist = Math.hypot(subVec.x, subVec.y)

        if (dist < object.a) {
            return true
        }
        return false
    }
}
