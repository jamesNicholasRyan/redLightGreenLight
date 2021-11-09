import initializeGame from '../engine/init.js'

import Man from '../engine/entities/Man'
import SuccessLine from '../engine/entities/SuccessLine.js'
import Lights from '../engine/ui/Lights'
import Girl from '../engine/logic/Girl'
import BalanceBall from '../engine/logic/BalanceBall.js'
import BalanceUI from '../engine/ui/BalanceUI.js'


export default class World {

    constructor(name, width, height, tileWidth) {
        this.name = name
        this.worldWidth = width
        this.worldHeight = height
        this.tileWidth = tileWidth
        this.tiles = []
        
        // UTILS
        this.gameStarted = false

        // POSITIONS
        this.balanceX = this.worldWidth * 0.6
        this.balanceY = this.worldHeight * 0.9
        this.balanceWidth = 400

        // GAMEPLAY
        this.balancing = false
        this.balanceMin = (this.worldWidth * 0.6)
        this.balanceMax = (this.worldWidth * 0.6) + this.balanceWidth
        this.balanceMed = (this.worldWidth * 0.6) + (this.balanceWidth/2)
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
        
        this.balancing = window.balanceUI.checkManBalance()
        // this.checkManBalance()
        if (this.balancing) {                   // If the man is balancing
            balanceUI.checkLostBalance()        // check if he has lost his balance...
            if (!window.balanceUI.active) window.balanceUI.activate()   // if the balance mini game isn't active, activate it
        } else {
            window.balanceUI.deactivate()       // else, de-activate it
        }
    }

    runGame() {   
        // create game data
        // window.balanceBall = new BalanceBall(this.balanceMed, 0, this.balanceMin, this.balanceMax)
        // window.gameEngine.worldState.push(window.balanceBall)

        const successLine = new SuccessLine(0, this.worldHeight*gameEngine.successLine, this.worldWidth, 5)
        gameEngine.createGameObject(successLine)

        window.man1 = new Man(this.worldWidth/2, this.worldHeight*0.9, 30, 30, 0, 0, 0x025666)
        gameEngine.createGameObject(man1)

        const lights = new Lights(10, 10, 80, 200, 0x025666)
        window.balanceUI = new BalanceUI(this.balanceX, this.balanceY, this.balanceWidth, 50, 0x025666, 0xFF0000,
            this.balanceMed, 0, this.balanceMin, this.balanceMax       
            )
        gameEngine.createGameObject(lights)
        gameEngine.createGameObject(balanceUI)

        const girl = new Girl()
        girl.randomTimer()

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

