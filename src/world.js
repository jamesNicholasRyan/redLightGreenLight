import initializeGame from '../engine/init.js'

import Man from '../engine/entities/Man'
import SuccessLine from '../engine/entities/SuccessLine.js'
import Lights from '../engine/ui/Lights'
import Girl from '../engine/logic/Girl'
import BalanceUI from '../engine/ui/BalanceUI.js'
import GameOverPopUp from '../engine/ui/GameOverPopUp.js'
import WinPopUp from '../engine/ui/WinPopUp.js'
import LevelTimer from '../engine/ui/LevelTimer.js'
import StartCountDownTimer from '../engine/ui/StartCountDown.js'


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
        this.paused = false
        this.isLevelActive = false
        this.gameOver = false
        this.gameWin = false

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
        if (!this.gameStarted) return                    // wait for the game to initialize first
        this.balancing = window.balanceUI.checkManBalance()
        // this.checkManBalance()
        if (this.balancing && gameEngine.redLight && this.isLevelActive) {                   // If the man is balancing
            balanceUI.checkLostBalance()           // check if he has lost his balance...
            if (!window.balanceUI.active) window.balanceUI.activate()   // if the balance mini game isn't active, activate it
        } else {
            window.balanceUI.deactivate()          // else de-activate it
        }
        
        this.checkTimer()
        this.checkManDead()
        this.checkWinCondition()
        if (this.paused) {
            this.pauseGame()
        }
    }

    runGame() {   
        this.createGameObjects()
        gameEngine.loop()
        this.gameStarted = true
    }
    
    createGameObjects() {
        // create game data
        const successLine = new SuccessLine(0, this.worldHeight*gameEngine.successLine, this.worldWidth, 5)
        gameEngine.createGameObject(successLine, 'gameObject')

        window.man1 = new Man(this.worldWidth/2, this.worldHeight*0.9, 30, 30, 0, 0, 0x025666)
        gameEngine.createGameObject(man1, 'gameObject')

        const lights = new Lights(10, 10, 80, 200, 0x025666)
        const levelTimerUI = new LevelTimer(((this.worldWidth/2)-50), 5, 100, 25, 0x025666)
        const startCountDownTimerUI = new StartCountDownTimer(this.worldWidth/2, this.worldHeight/2, 50, 50, 0x025666)
        window.balanceUI = new BalanceUI(this.balanceX, this.balanceY, this.balanceWidth, 50, 0x025666, 0xFF0000,
                                         this.balanceMed, 0, this.balanceMin, this.balanceMax)
        const gameOverPopUp = new GameOverPopUp(this.worldWidth/2, this.worldHeight/2, 200, 100, 0x025666)
        const winPopUp = new WinPopUp(this.worldWidth/2, this.worldHeight/2, 200, 100, 0x025666)

        gameEngine.createGameObject(lights, 'UI')
        gameEngine.createGameObject(levelTimerUI, 'UI')
        gameEngine.createGameObject(startCountDownTimerUI, 'UI')
        gameEngine.createGameObject(balanceUI, 'UI')
        gameEngine.createGameObject(gameOverPopUp, 'UI')
        gameEngine.createGameObject(winPopUp, 'UI')

        window.girl = new Girl()

        gameEngine.worldState.push(window.girl)
        window.girl.startLevelCountDown()

    }

    resetGame() {
        window.gameEngine.resetEngine()
        this.deActivateLevel()
        this.createGameObjects()
        window.man1.reset()
        this.gameOver = false
        this.gameWin = false
        this.paused = false
        this.unPauseGame()
    }
    
    pauseGame() {
        setTimeout(() => {
            window.cancelAnimationFrame( gameEngine.loop.stopLoop ) 
        }, 50)
    }
    
    unPauseGame() {
        setTimeout(() => {
            gameEngine.loop()
        }, 50)
    }

    activateLevel() {
        console.log('GAME LEVEL ACTIVE!')
        this.isLevelActive = true
        const gameObjects = window.gameEngine.state.gameObjects
        gameObjects.forEach((obj) => {
            obj.active = true
        })
        window.girl.levelTimer()
    }

    deActivateLevel() {
        console.log('STOPPING GAME LEVEL!')
        this.isLevelActive = false
        const gameObjects = window.gameEngine.state.gameObjects
        if (gameObjects) {
            gameObjects.forEach((obj) => {
                obj.active = false
            })
        }
        const UIobjects = window.gameEngine.state.ui
        if (UIobjects) {
            UIobjects.forEach((obj) => {
                obj.active = false
            })
        }
    }

    checkTimer() {
        if (window.girl.outOfTime) {
            console.log('TIMER CHEKED: OUT OF TIME')
            this.pause = true
            this.gameOver = true
        }
    }
    
    checkManDead() {
        if (window.man1.dead) {
            this.paused = true
            this.gameOver = true
            // this.deActivateLevel()
        }
    }

    checkWinCondition() {
        if (window.man1.hasWon) {
            this.pause = true
            this.gameWin = true
        }
    }
}

