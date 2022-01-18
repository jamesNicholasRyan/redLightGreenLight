import initializeGame from '../engine/init.js'
import { createGirl, createUI, createGameCharacters } from './levelsAndMenus/levels.js'

import randomNumGen from '../engine/utils/randomNumberGen.js'
import IdGenerator from '../engine/utils/idGenerrator.js'
import Vector from '../engine/utils/vector.js'

import Man from '../engine/entities/Man'
import SuccessLine from '../engine/entities/SuccessLine.js'
import Lights from '../engine/ui/Lights'
import Girl from '../engine/logic/Girl'
import BalanceUI from '../engine/ui/BalanceUI.js'
import GameOverPopUp from '../engine/ui/GameOverPopUp.js'
import WinPopUp from '../engine/ui/WinPopUp.js'
import LevelTimer from '../engine/ui/LevelTimer.js'
import StartCountDownTimer from '../engine/ui/StartCountDown.js'
import Bullet from '../engine/entities/particles/Bullet.js'
import BloodSplatter from '../engine/entities/particles/BloodSplatter.js'
import AIMan from '../engine/entities/AIMan.js'
import Menu from '../engine/ui/menus/Menu.js'
import { mainMenu, pauseMenu } from './levelsAndMenus/menus.js'
import stateService from '../engine/utils/statemachine.js'


export default class World {

    constructor(name, width, height, tileWidth) {
        this.name = name
        this.worldWidth = width
        this.worldHeight = height
        this.tileWidth = tileWidth
        this.tiles = []
        
        // UTILS
        this.gameStarted = false
        this.gameObjectStr = 'gameObject'
        this.UIstr = 'UI'
        this.particlesStr = 'particles'
        this.buttonsStr = 'buttons'
        this.menuStr = 'menus'

        // STATE
        this.stateService = stateService

        // POSITIONS
        this.balanceX = this.worldWidth * 0.6
        this.balanceY = this.worldHeight * 0.9
        this.balanceWidth = 400

        // GAMEPLAY
        this.paused = false
        this.level = 1
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
        // World state holds updatable objects that don't need to be rendered - such 
        // as the girl/timer logic
        gameEngine.loadSprites()
        gameEngine.worldState.push(this)
    }

    update() {
        // This update function, updates the whole game / world data!
        console.log(this.stateService.state.value)
        if (this.stateService.state.matches('playing')) {
            if (!this.gameStarted) return                    // wait for the game to initialize first
            this.balancing = window.balanceUI.checkManBalance()
            if (this.balancing && gameEngine.redLight && this.isLevelActive) {   // If the man is balancing
                // balanceUI.checkLostBalance()           // check if he has lost his balance...
                if (!window.balanceUI.active) window.balanceUI.activate()   // if the balance mini game isn't active, activate it
                this.randomAIdeath()
            } else {
                window.balanceUI.deactivate()          // else de-activate it
            }

            this.checkTimer()
            this.checkManDead()
            this.checkWinCondition()
            this.checkManCollision()
            if (this.isLevelActive) gameEngine.orderObjects()

        } else if (this.stateService.state.matches('pauseMenu')) {
            // console.log('pausing game')
            this.pauseGame()
            return
        }
    }

    runGame() {  
        this.createGameData()
        gameEngine.loop()
        this.gameStarted = true
    }
    
    createGameData() {
        // Create game data
        createUI()
        createGirl()
        createGameCharacters(this.level)
        mainMenu()
        pauseMenu()
    }

    shootBullet(targetLocation) {
        // This method is called when a man dies - creates a bullett object and
        // initiates its shoot method
        const rand = Math.floor(Math.random() * (700 - 200 + 1) + 200)
        const bullet = new Bullet(rand, 0, targetLocation, 5, 10, 0x025666)
        gameEngine.createGameObject(bullet, this.particlesStr)
        bullet.init()
    }

    bloodSplatter(targetLocation) {
        // This method is called when a man dies - setting off a blood splatter particle
        // system animation
        const bloodSplatter = new BloodSplatter(targetLocation.x, targetLocation.y, 40)
        bloodSplatter.init()
    }

    randomAIdeath() {
        // Method that loops through all alive AI men and kills them randomly
        const AImen = gameEngine.state['gameObjects'].filter((obj) => obj.id > 1)
        AImen.forEach((man) => {
            if (man.dead || man.isMoving()) return
            const randNum = randomNumGen(1, man.deathProb)
            if (randNum < 2) {
                man.dead = true
                man.checkDead()
            } 
        })
    }

    createAI(idGenerator) {
        // loop through and create AI men
        for (let i=0; i<40; i++) {
            const manAI = new AIMan(idGenerator.generateId(), 
                                    randomNumGen(this.worldWidth*0.05, this.worldWidth*0.95), 
                                    randomNumGen(this.worldHeight*0.89, this.worldHeight*0.95),
                                    30, 30)
            gameEngine.createGameObject(manAI, this.gameObjectStr)
        }
    }

    resetGame() {
        this.stopAnimationLoop()
        window.gameEngine.resetEngine()
        this.deActivateLevel()
        this.createGameData()
        window.man1.reset()
        this.gameOver = false
        this.gameWin = false
        this.paused = false
        this.retsartAnimationLoop()
        // this.togglePauseGame()
    }
    
    stopAnimationLoop() {
        setTimeout(() => {
            window.cancelAnimationFrame( gameEngine.loop.stopLoop ) 
        }, 50)
    }
    
    retsartAnimationLoop() {
        setTimeout(() => {
            gameEngine.loop()
        }, 50)
    }

    pauseGame() {
        // Loops through all relevant gameObjects and pauses them
        const objectsToPause = ['gameObjects', 'particles']
        // console.log('pausing game')
        objectsToPause.forEach((type) => {
            const objects = gameEngine.state[type]
            if (!objects) return
            objects.forEach((obj) => {
                // console.log('pausing objects')
                obj.pause = true
            })
        })
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
            this.activateLoss()
            this.pause = true
            // this.gameOver = true
        }
    }
    
    checkManDead() {
        if (window.man1.dead) {
            this.activateLoss()
            this.paused = true
            // this.gameOver = true
            // this.deActivateLevel()
        }
    }

    checkWinCondition() {
        if (window.man1.hasWon) {
            this.pause = true
            this.gameWin = true
        }
    }

    checkManCollision() {
        const AIdata = gameEngine.state.gameObjects
        window.man1.checkCollision(AIdata)
    }

    activateLoss() {
        // This function creates a delay between loosing and the popup
        window.balanceUI.deactivate() 
        setTimeout(() => {
            this.pause = true
            this.gameOver = true
        }, 500)
    }
}

