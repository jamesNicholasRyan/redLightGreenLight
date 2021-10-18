// A file which initializes the game engine, adding it to a DOM element,
// with a width and height - centering it on the screen

import Engine from './engine.js'
import MouseController from './inputOuput/mouseController.js'
import KeyboardController from './inputOuput/keyboardController.js'

export default function initializeGame(width, height, targetFps, showFps) {

        const gameViewport = document.createElement('div')
        gameViewport.setAttribute('style', `display: flex;
                                justify-content: center;
                                align-items: center;
                                margin: 20% auto; 
                                background-color: black;
                                width: ${width}px;
                                height: ${height}px;
                                `)

        const canvasHTML = document.createElement('canvas')

        // initialise game engine
        window.gameEngine = new Engine(canvasHTML, width, height, targetFps, showFps)
        // initialise game input & output
        window.mouseController = new MouseController()
        window.keyboardController = new KeyboardController()
        mouseController.init()
        keyboardController.init()
        // gameEngine.setAttribute('style', `
        //                         background-color: grey;
        //                         margin: 0 auto;
        //                         width: ${width * 0.9}px;
        //                         height: ${height * 0.8}px;
        //                         `)
    
        gameViewport.appendChild(gameEngine.pixiRender())
        return gameViewport
}