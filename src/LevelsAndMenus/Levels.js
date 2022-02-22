// This file contains all the logic to create the specific levels

import IdGenerator from "../../engine/utils/idGenerrator"
import randomNumGen from "../../engine/utils/randomNumberGen"

import arenaBackgroundpng from "../../engine/assets/arena_backgroundgrey.png"
import pausePNG from '../../engine/assets/pause.png'

import Man from "../../engine/entities/Man"
import SuccessLine from "../../engine/entities/SuccessLine"
import Lights from "../../engine/ui/Lights"
import Girl from "../../engine/logic/Girl"
import BalanceUI from "../../engine/ui/BalanceUI"
import GameOverPopUp from "../../engine/ui/GameOverPopUp"
import WinPopUp from "../../engine/ui/WinPopUp"
import LevelTimer from "../../engine/ui/LevelTimer"
import StartCountDownTimer from "../../engine/ui/StartCountDown"
import AIMan from "../../engine/entities/AIMan"
import Button from "../../engine/ui/Button"
import Engine from "../../engine/engine"
import Background from "../../engine/ui/Background"
import GirlUi from "../../engine/ui/girlUi"

function pauseGame() {
    world.stateService.send('PAUSE')
    window.girl.clockStateService.send('PAUSE')
}

export function createUI() {
    // This function creates UI for the game level
    const world = window.world
    const successLine = new SuccessLine(0, world.worldHeight*gameEngine.successLine, world.worldWidth, 5)
    const lights = new Lights(10, 10, 80, 200, 0x025666)
    const levelTimerUI = new LevelTimer(10, 220, 110, 50, 0x000000, 40, 0x00ff00)
    const startCountDownTimerUI = new StartCountDownTimer(world.worldWidth/2, world.worldHeight/2, 50, 50, 0x002A1D, 80, 0x002A1D)
    const menuButton = new Button('menuButton', world.worldWidth - 40, 40, 30, 30, 0xffffff, ' || ', pauseGame, pausePNG, true)
    window.balanceUI = new BalanceUI(550, 825, 400, 50, 0x025666, 0xFF0000, 0)
    const gameOverPopUp = new GameOverPopUp(world.worldWidth/2, world.worldHeight/2, 300, 170, 0x025666, 'gameOver')
    const winPopUp = new WinPopUp(world.worldWidth/2, world.worldHeight/2, 300, 170, 0x025666)
    const girl = new GirlUi(world.worldWidth/2, 25, 0, 0, 0)
                                
    gameEngine.createGameObject(successLine, world.gameObjectStr)
    gameEngine.createGameObject(lights, world.UIstr)
    gameEngine.createGameObject(levelTimerUI, world.UIstr)
    gameEngine.createGameObject(startCountDownTimerUI, world.UIstr)
    gameEngine.createGameObject(balanceUI, world.UIstr)
    gameEngine.createGameObject(gameOverPopUp, world.UIstr)
    gameEngine.createGameObject(winPopUp, world.UIstr)
    gameEngine.createGameObject(menuButton, world.UIstr)
    gameEngine.createGameObject(girl, world.UIstr)
}

export function createGirl() {
    // This function creates the Girl object that specifies timer
    window.girl = new Girl('girl')
    const index = gameEngine.worldState.findIndex(object => {
        return object.name === 'girl'
    })
    if (index >= 0) {
        gameEngine.worldState.splice(index, 1, window.girl)
    } else {
        gameEngine.worldState.push(window.girl)
    }   
}

export function createGameCharacters(level) {
    // This function creates all the game objects for the level
    let numOfAi = 10
    if (level === 1) numOfAi = 20
    if (level === 2) numOfAi = 60
    if (level === 3) numOfAi = 100

    const idGenerator = new IdGenerator()
    window.man1 = new Man(idGenerator.generateId(), world.worldWidth/2, world.worldHeight*0.9, 30, 30, 0, 0, 0x025666)
    gameEngine.createGameObject(man1, world.gameObjectStr)

    createAI(idGenerator, numOfAi)
}

function createAI(idGenerator, numOfAI) {
    // loop through and create AI men
    for (let i=0; i<numOfAI; i++) {
        const manAI = new AIMan(idGenerator.generateId(), 
                                randomNumGen(world.worldWidth*0.05, world.worldWidth*0.95), 
                                randomNumGen(world.worldHeight*0.89, world.worldHeight*0.95),
                                30, 30)
        gameEngine.createGameObject(manAI, world.gameObjectStr)
    }
}

export function createBackground() {
    // Create background object for game level
    const arenaBackground = new Background(0,0, window.world.worldWidth, window.world.worldHeight, 0x808080, arenaBackgroundpng)
    gameEngine.createGameObject(arenaBackground, world.backgroundStr)
}