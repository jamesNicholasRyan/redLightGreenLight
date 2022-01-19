// This file contains all the logic to create the specific levels

import IdGenerator from "../../engine/utils/idGenerrator"
import randomNumGen from "../../engine/utils/randomNumberGen"

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

function pauseGame() {
    world.stateService.send('PAUSE')
}

export function createUI() {
    // This function creates UI for the game level
    const world = window.world
    const successLine = new SuccessLine(0, world.worldHeight*gameEngine.successLine, world.worldWidth, 5)
    const lights = new Lights(10, 10, 80, 200, 0x025666)
    const levelTimerUI = new LevelTimer(((world.worldWidth/2)-50), 5, 100, 25, 0x025666)
    const startCountDownTimerUI = new StartCountDownTimer(world.worldWidth/2, world.worldHeight/2, 50, 50, 0x025666)
    const menuButton = new Button('menuButton', world.worldWidth - 40, 10, 30, 30, 0xffffff, ' || ', pauseGame)
    window.balanceUI = new BalanceUI(world.balanceX, world.balanceY, world.balanceWidth, 50, 0x025666, 0xFF0000,
                                     world.balanceMed, 0, world.balanceMin, world.balanceMax)
                                     const gameOverPopUp = new GameOverPopUp(world.worldWidth/2, world.worldHeight/2, 200, 100, 0x025666)
                                     const winPopUp = new WinPopUp(world.worldWidth/2, world.worldHeight/2, 200, 100, 0x025666)
        
    gameEngine.createGameObject(successLine, world.gameObjectStr)
    gameEngine.createGameObject(lights, world.UIstr)
    gameEngine.createGameObject(levelTimerUI, world.UIstr)
    gameEngine.createGameObject(startCountDownTimerUI, world.UIstr)
    gameEngine.createGameObject(balanceUI, world.UIstr)
    gameEngine.createGameObject(gameOverPopUp, world.UIstr)
    gameEngine.createGameObject(winPopUp, world.UIstr)
    gameEngine.createGameObject(menuButton, world.UIstr)
}

export function createGirl() {
    // This function creates the Girl object that soecifies timer
    window.girl = new Girl()
    gameEngine.worldState.push(window.girl)
    window.girl.startLevelCountDown()      
}

export function createGameCharacters(level) {
    // This function creates all the game objects for the level
    let numOfAi = 10
    if (level === 1) numOfAi = 20
    if (level === 2) numOfAi = 40
    if (level === 3) numOfAi = 60

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