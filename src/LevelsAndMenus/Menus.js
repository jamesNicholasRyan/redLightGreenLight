import Menu from "../../engine/ui/menus/Menu"

// buttons
import resumeSprite from '../../engine/assets/resume.png'
import optionsSprite from '../../engine/assets/options.png'
import mainMenuSprite from '../../engine/assets/mainmenu.png'
import startGameSprite from '../../engine/assets/new_game.png'
import backSprite from '../../engine/assets/back.png'
import difficultySprite from '../../engine/assets/difficulty.png'
import soundSprite from '../../engine/assets/sound.png'
import levelOneSprite from '../../engine/assets/levelone.png'
import levelTwoSprite from '../../engine/assets/leveltwo.png'
import levelThreeSprite from '../../engine/assets/levelthree.png'
import menuBackground from '../../engine/assets/menu_background.png'


function mainMenu() {
    const world = window.world
    const buttonX = world.worldWidth*0.5
    const mainMenuButtonData = [
        {
            'name': 'startGame',
            'action': startGame,
            sprite: startGameSprite,
            x: buttonX,
            y: 200,
            w: 100,
            h: 50,
            fill: 0xffffff
        },
        {
            'name': 'options',
            'action': mainOptions,
            sprite: optionsSprite,
            x: buttonX,
            y: 350,
            w: 100,
            h: 50,
            fill: 0xffffff
        },
    ]
    const mainMenu = new Menu('mainMenu', world.worldWidth, world.worldHeight, 
                               0xad0061, false, mainMenuButtonData, 0.1, 1, menuBackground)
    gameEngine.createGameObject(mainMenu, world.UIstr)
}

function pauseMenu() {
    const world = window.world
    const buttonX = world.worldWidth*0.6
    const pauseMenuButtonData = [
        {
            'name': 'resume',
            'action': resumeGame,
            sprite: resumeSprite,
            x: buttonX,
            y: 200,
            w: 100,
            h: 50,
            fill: 0xffffff
        },
        {
            'name': 'options',
            'action': pauseOptions,
            sprite: optionsSprite,
            x: buttonX,
            y: 350,
            w: 100,
            h: 50,
            fill: 0xffffff
        },
        {
            'name': 'mainMenu',
            'action': mainMenuButton,
            sprite: mainMenuSprite,
            x: buttonX,
            y: 500,
            w: 100,
            h: 50,
            fill: 0xffffff
        },
    ]
    const pauseMenu = new Menu('pauseMenu', world.worldWidth, world.worldHeight, 
                                0xa1788f, false, pauseMenuButtonData, 0.15, 0.3, null)
    gameEngine.createGameObject(pauseMenu, world.UIstr)
}

function mainOptionsMenu() {
    const world = window.world
    const buttonX = world.worldWidth*0.4
    const mainOptionsButtonData = [
        {
            'name': 'back',
            'action': back,
            sprite: backSprite,
            x: buttonX,
            y: 200,
            w: 100,
            h: 50,
            fill: 0xffffff
        },
        {
            'name': 'difficulty',
            'action': difficultyOptions,
            sprite: difficultySprite,
            x: buttonX,
            y: 350,
            w: 100,
            h: 50,
            fill: 0xffffff
        },
        {
            'name': 'sound',
            'action': soundOptions,
            sprite: soundSprite,
            x: buttonX,
            y: 500,
            w: 100,
            h: 50,
            fill: 0xffffff
        },
    ]
    const mainOptionsMenu = new Menu('mainOptions', world.worldWidth, world.worldHeight, 
                                      0x83bd00, false, mainOptionsButtonData, 0.1, 1, menuBackground)
    gameEngine.createGameObject(mainOptionsMenu, world.UIstr)
}

function difficultyMenu() {
    const world = window.world
    const buttonX = world.worldWidth*0.3
    const difficultyButtonData = [
        {
            'name': 'back',
            'action': back,
            sprite: backSprite,
            x: buttonX,
            y: 200,
            w: 100,
            h: 50,
            fill: 0xffffff
        },
        {
            'name': 'levelOne',
            'action': function() {level(1)},
            sprite: levelOneSprite,
            x: buttonX,
            y: 350,
            w: 100,
            h: 50,
            fill: 0xffffff
        },
        {
            'name': 'levelTwo',
            'action': function() {level(2)},
            sprite: levelTwoSprite,
            x: buttonX,
            y: 500,
            w: 100,
            h: 50,
            fill: 0xffffff
        },
        {
            'name': 'levelThree',
            'action': function() {level(3)},
            sprite: levelThreeSprite,
            x: buttonX,
            y: 650,
            w: 100,
            h: 50,
            fill: 0xffffff
        },
    ]
    const difficultyMenu = new Menu('difficulty', world.worldWidth, world.worldHeight, 
                                     0x93bd32, false, difficultyButtonData, 0.1, 1, menuBackground)
    gameEngine.createGameObject(difficultyMenu, world.UIstr)
}

function resumeGame() {
    window.world.stateService.send('BACK')
    window.girl.clockStateService.send('RESUME')
}

function pauseOptions() {
    // window.world.stateService.send('OPTIONS')
    console.log('PAUSE OPTIONS!')
}

function mainMenuButton() {
    window.world.stateService.send('MAINMENU')
    window.girl.clockStateService.send('STOP')
}

function startGame() {
    window.world.stateService.send('STARTGAME')
    window.girl.clockStateService.send('START')
    window.world.resetGame()
}

function mainOptions() {
    window.world.stateService.send('OPTIONS')
}

function back() {
    window.world.stateService.send('BACK')
}

function difficultyOptions() {
    window.world.stateService.send('DIFFICULTY')
}

function level(difficulty) {
    window.world.level = difficulty
}

function soundOptions() {
    // window.world.stateService.send('SOUND')
    console.log('SOUND MENU!')
}


export {
    mainMenu,
    pauseMenu,
    mainOptionsMenu,
    difficultyMenu,
}

