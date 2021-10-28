import initializeGame from '../engine/init.js'

import Man from '../engine/entities/Man'
import SuccessLine from '../engine/entities/SuccessLine.js'
import Lights from '../engine/ui/Lights'
import Girl from '../engine/logic/Girl'


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

        gameEngine.loadSprites()
    }

    runGame() {
        gameEngine.loop()

        const successLine = new SuccessLine(0, this.worldHeight*gameEngine.successLine, this.worldWidth, 5)
        gameEngine.createGameObject(successLine)

        const man1 = new Man(this.worldWidth/2, this.worldHeight*0.9, 30, 30, 0, 0, 0x025666)
        gameEngine.createGameObject(man1)

        
        const lights = new Lights(10, 10, 80, 200, 0x025666)
        gameEngine.createGameObject(lights)


        const girl = new Girl()
        girl.randomTimer()
        
        console.log(gameEngine.playerSheet)
    
        const listener = window.addEventListener('click', function(event) {  
            console.log('************ incrementing loop ************')                        
            gameEngine.loop()
            console.log(gameEngine.state.gameObjects[0])
            window.cancelAnimationFrame( gameEngine.loop.stopLoop )   
        })
    }


}

