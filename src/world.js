import initializeGame from '../engine/init.js'

import Man from '../engine/entities/Man'
import SuccessLine from '../engine/entities/SuccessLine.js'
import Lights from '../engine/ui/Lights'
import Girl from '../engine/logic/Girl'
import BalanceBall from '../engine/logic/BalanceBall.js'


export default class World {

    constructor(name, width, height, tileWidth) {
        this.name = name
        this.worldWidth = width
        this.worldHeight = height
        this.tileWidth = tileWidth
        this.tiles = []
        
        // UTILS
        this.gameStarted = false

        // GAMEPLAY
        this.balancing = false
    }

    init() {
        const initializedGame = initializeGame(this.worldWidth, this.worldHeight, 30, true)
        document.body.appendChild(initializedGame)

        // Loading the sprites and adding world data to the engine
        gameEngine.loadSprites()
        gameEngine.worldState.push(this)
    }

    update() {
        // This update function, updates the whole game / world data!
        if (!this.gameStarted) return           // wait for the game tp initialize first
        
        this.balancing = window.balanceBall.checkManBalance()
        // this.checkManBalance()
        if (this.balancing) {                    // If the man is balancing
            balanceBall.checkLostBalance()       // check if he has lost his balance...
            if (!window.balanceBall.active) window.balanceBall.activate()   // if the balance mini game isn't active, activate it
        } else {
            window.balanceBall.deactivate()       // else, de-activate it
        }
    }

    runGame() {   
        // create game data

        const successLine = new SuccessLine(0, this.worldHeight*gameEngine.successLine, this.worldWidth, 5)
        gameEngine.createGameObject(successLine)

        window.man1 = new Man(this.worldWidth/2, this.worldHeight*0.9, 30, 30, 0, 0, 0x025666)
        gameEngine.createGameObject(man1)

        const lights = new Lights(10, 10, 80, 200, 0x025666)
        gameEngine.createGameObject(lights)

        const girl = new Girl()
        girl.randomTimer()
        
        window.balanceBall = new BalanceBall(500, 0)
        window.gameEngine.worldState.push(window.balanceBall)

        gameEngine.loop()
        this.gameStarted = true
    
        const listener = window.addEventListener('click', function(event) {  
            console.log('************ incrementing loop ************')                        
            gameEngine.loop()
            // console.log(gameEngine.state.gameObjects[0])
            // balanceBall.activate()
            window.cancelAnimationFrame( gameEngine.loop.stopLoop )   
        })
    }

}

