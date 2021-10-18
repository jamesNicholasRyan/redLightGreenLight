// A file which initializes the game engine, adding it to a DOM element,
// with a width and height - centering it on the screen

import Engine from './engine.js'
import MouseController from './inputOuput/mouseController.js'

export default function initializeGame(width, height, targetFps, showFps) {

        const gameViewport = document.createElement('div')
        gameViewport.setAttribute('style', `display: flex;
                                justify-content: center;
                                align-items: center;
                                margin: 0 auto; 
                                background-color: black;
                                width: ${width * 0.99}px;
                                height: ${height * 0.98}px;
                                `)

        const canvasHTML = document.createElement('canvas')

        window.gameEngine = new Engine(canvasHTML, width, height, targetFps, showFps)
        window.mouseController = new MouseController()
        mouseController.init()
        // gameEngine.setAttribute('style', `
        //                         background-color: grey;
        //                         margin: 0 auto;
        //                         width: ${width * 0.9}px;
        //                         height: ${height * 0.8}px;
        //                         `)
    
        gameViewport.appendChild(gameEngine.pixiRender())
        return gameViewport
}