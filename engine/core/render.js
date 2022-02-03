// Game render module
// Called by the game loop, this module will perform the 
// global state to re-render the canvas using new data.
// Additionally, it will call all gameObjects 'render' methods

import * as PIXI from 'pixi.js'

function gameRender( engine ) {
    const fps = 30
    // setup globals
    const w = engine.width,
          h = engine.height

    return function render() {
        // clear out the canvas
        // console.log('rendering!!')
        // engine.graphics.clear()

        if (engine.showFps) {
            // const text = new PIXI.Text(`${fps}`, {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'right'})
            // engine.addToStage(text)
        }
        if (engine.state) {

            if (!engine.state.hasOwnProperty('gameObjects')) return
            const gameObjects = engine.state.gameObjects
            gameObjects.forEach((obj) => {
                obj.graphics.clear()
                obj.display()
            })
            const backgrounds = engine.state.backgrounds
            backgrounds.forEach((obj) => {
                obj.graphics.clear()
                obj.display()
            })
            const uiObjects = engine.state.ui
            uiObjects.forEach((obj) => {
                obj.graphics.clear()
                obj.display()
            })
            const buttonObjects = engine.state.buttons
            if (buttonObjects) {
                buttonObjects.forEach((obj) => {
                    obj.graphics.clear()
                    obj.display()
                })
            }
            const particleObjects = engine.state.particles
            if (particleObjects) {
                particleObjects.forEach((obj) => {
                    obj.graphics.clear()
                    obj.display()
                })
            }
        }
        engine.renderer.render(engine.stage)
    }
}

export {
    gameRender
}