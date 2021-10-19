import * as PIXI from 'pixi.js'
import MouseController from '../engine/inputOuput/mouseController'
import initializeGame from '../engine/init.js'

import Man from '../engine/entities/Man'
import KeyboardController from '../engine/inputOuput/keyboardController'



export default class World {

    constructor(name, width, height, tileWidth) {
        this.name = name
        this.worldWidth = width
        this.worldHeight = height
        this.tileWidth = tileWidth
        this.tiles = []
    }

    init() {
        const initializedGame = initializeGame(this.worldWidth, this.worldHeight, 30, true)
        document.body.appendChild(initializedGame)
    }

    runGame() {
        gameEngine.loop()

        const man1 = new Man(this.worldWidth/2, this.worldHeight/2, 30, 30, 0, 0, 0x025666)

        gameEngine.createGameObject(man1)
    
        const listener = window.addEventListener('click', function(event) {  
            console.log('************ incrementing loop ************')                        
            gameEngine.loop()
            console.log(gameEngine.state.gameObjects[0])
            window.cancelAnimationFrame( gameEngine.loop.stopLoop )   
        })
    }


}

