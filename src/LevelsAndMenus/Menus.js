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
import increase from '../../engine/assets/increase.png'
import decrease from '../../engine/assets/decrease.png'
import logoPNG from '../../engine/assets/game_logo.png'
import enter from '../../engine/assets/enter.png'
import instructions from '../../engine/assets/instructions.png'
import instructionsOne from '../../engine/assets/instructions_1.png'
import instructionsTwo from '../../engine/assets/instructions_2.png'


function splashScreen() {
    const world = window.world
    const ratio = world.ratio
    const buttonX = (world.worldWidth*0.5)
    const mainMenuButtonData = [
        {
            'name': 'enterGame',
            'action': enterGame,
            sprite: enter,
            x: buttonX,
            y: 400 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
    ]
    const splashScreen = new Menu('splashScreen', world.worldWidth, world.worldHeight, 
        0xad0061, false, mainMenuButtonData, 0.1, 1, menuBackground, 
        false, null, logoPNG, 744, 184, 140, 100)
    gameEngine.createGameObject(splashScreen, world.UIstr)
}

function mainMenu() {
    const world = window.world
    const ratio = world.ratio
    const buttonX = (world.worldWidth*0.5)
    const mainMenuButtonData = [
        {
            'name': 'startGame',
            'action': startGame,
            sprite: startGameSprite,
            x: buttonX,
            y: 400 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
        {
            'name': 'options',
            'action': mainOptions,
            sprite: optionsSprite,
            x: buttonX,
            y: 525 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
        {
            'name': 'howTo',
            'action': howTo,
            sprite: instructions,
            x: buttonX,
            y: 650 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
    ]
    const mainMenu = new Menu('mainMenu', world.worldWidth, world.worldHeight, 
                               0xad0061, false, mainMenuButtonData, 0.1, 1, menuBackground, 
                               false, null, logoPNG, 744, 184, 140, 100)
    gameEngine.createGameObject(mainMenu, world.UIstr)
}

function howToMenu() {
    const world = window.world
    const ratio = world.ratio
    const buttonX = world.worldWidth*0.5
    const howToButtonData = [
        {
            'name': 'back',
            'action': back,
            sprite: backSprite,
            x: buttonX,
            y: 200 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
        {
            'name': 'image_one',
            'action': function() {return null},
            sprite: instructionsOne,
            x: 250 * ratio,
            y: 450 *ratio,
            w: 379.5 *ratio,
            h: 315 *ratio,
            fill: 0xffffff
        },
        {
            'name': 'image_two',
            'action': function() {return null},
            sprite: instructionsTwo,
            x: 750 * ratio,
            y: 450 *ratio,
            w: 379.5 *ratio,
            h: 315 *ratio,
            fill: 0xffffff
        }
    ]
    const text1 = `MOVE WITH WASD`
    const text2 = `BALANCE WITH \nARROW KEYS`
    const textData = [
        {
            getText: function() {return text1},
            'text': text1,
            fontSize: 28 * ratio,
            fill: 0x000000,
            x: 250 * ratio,
            y: 650 *ratio,
        },
        {
            getText: function() {return text2},
            'text': text2,
            fontSize: 28 * ratio,
            fill: 0x000000,
            x: 750 * ratio,
            y: 650 *ratio,
        }
    ]
    const howToMenu = new Menu('howTo', world.worldWidth, world.worldHeight, 
                                      0x83bd00, false, howToButtonData, 0.1, 1, menuBackground, false, textData)
    gameEngine.createGameObject(howToMenu, world.UIstr)
}

function pauseMenu() {
    const world = window.world
    const ratio = world.ratio
    const buttonX = world.worldWidth*0.5
    const pauseMenuButtonData = [
        {
            'name': 'resume',
            'action': resumeGame,
            sprite: resumeSprite,
            x: buttonX,
            y: 200 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
        {
            'name': 'options',
            'action': pauseOptions,
            sprite: optionsSprite,
            x: buttonX,
            y: 350 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
        {
            'name': 'mainMenu',
            'action': mainMenuButton,
            sprite: mainMenuSprite,
            x: buttonX,
            y: 500 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
    ]
    const pauseMenu = new Menu('pauseMenu', world.worldWidth, world.worldHeight, 
                                0x000000, false, pauseMenuButtonData, 0.15, 0.3, null, true)
    gameEngine.createGameObject(pauseMenu, world.UIstr)
}

function mainOptionsMenu() {
    const world = window.world
    const ratio = world.ratio
    const buttonX = world.worldWidth*0.5
    const mainOptionsButtonData = [
        {
            'name': 'back',
            'action': back,
            sprite: backSprite,
            x: buttonX,
            y: 200 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
        {
            'name': 'difficulty',
            'action': difficultyOptions,
            sprite: difficultySprite,
            x: buttonX,
            y: 350 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
        {
            'name': 'sound',
            'action': soundOptions,
            sprite: soundSprite,
            x: buttonX,
            y: 500 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
    ]
    const mainOptionsMenu = new Menu('mainOptions', world.worldWidth, world.worldHeight, 
                                      0x83bd00, false, mainOptionsButtonData, 0.1, 1, menuBackground)
    gameEngine.createGameObject(mainOptionsMenu, world.UIstr)
}

function difficultyMenu() {
    const world = window.world
    const ratio = world.ratio
    const buttonX = world.worldWidth*0.5
    const difficultyButtonData = [
        {
            'name': 'back',
            'action': back,
            sprite: backSprite,
            x: buttonX,
            y: 200 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
        {
            'name': 'levelOne',
            'action': function() {level(1)},
            sprite: levelOneSprite,
            x: buttonX,
            y: 350 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
        {
            'name': 'levelTwo',
            'action': function() {level(2)},
            sprite: levelTwoSprite,
            x: buttonX,
            y: 500 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
        {
            'name': 'levelThree',
            'action': function() {level(3)},
            sprite: levelThreeSprite,
            x: buttonX,
            y: 650 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
    ]
    const difficultyMenu = new Menu('difficulty', world.worldWidth, world.worldHeight, 
                                     0x93bd32, false, difficultyButtonData, 0.1, 1, menuBackground)
    gameEngine.createGameObject(difficultyMenu, world.UIstr)
}

function soundMenu() {
    const world = window.world
    const ratio = world.ratio
    const buttonX = world.worldWidth*0.5
    const soundButtonData = [
        {
            'name': 'back',
            'action': back,
            sprite: backSprite,
            x: buttonX,
            y: 200 *ratio,
            w: 279 *ratio,
            h: 106 *ratio,
            fill: 0xffffff
        },
        {
            'name': 'decreaseMaster',
            'action': function() {decreaseSound('master')},
            sprite: decrease,
            x: buttonX + 50,
            y: 350 *ratio,
            w: 50 *ratio,
            h: 50 *ratio,
            fill: 0xffffff
        },
        {
            'name': 'increaseMaster',
            'action': function() {increaseSound('master')},
            sprite: increase,
            x: buttonX + 100,
            y: 350 *ratio,
            w: 50 *ratio,
            h: 50 *ratio,
            fill: 0xffffff
        },
    ]
    const textData = [
        {
            getText: function() {return window.world.masterVolume + '%'},
            'text': window.world.masterVolume,
            fontSize: 23,
            fill: 0x000000,
            x: buttonX + 160,
            y: 350 *ratio,
        },
        {
            getText: function() {return 'MASTER'},
            'text': window.world.masterVolume,
            fontSize: 25,
            fill: 0x000000,
            x: buttonX - 50,
            y: 350 *ratio,
        },
    ]
    const soundMenu = new Menu('sound', world.worldWidth, world.worldHeight, 
                               0x93bd32, false, soundButtonData, 0.1, 1, menuBackground, false, textData)
    gameEngine.createGameObject(soundMenu, world.UIstr)
}

function enterGame() {
    window.world.stateService.send('ENTER')
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
    window.audioController.playSound('intro', 500)
    window.world.menuScreenActive = false
}

function mainOptions() {
    window.world.stateService.send('OPTIONS')
}

function howTo() {
    window.world.stateService.send('HOWTO')
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

function increaseSound(sound) {
    if (sound === 'master') {
        const newVolume = Math.round((world.masterVolume + world.volumeIncrement) * 10) / 10
        world.masterVolume = newVolume < world.volumeMax ? newVolume : world.volumeMax
    }
}

function decreaseSound(sound) {
    if (sound === 'master') {
        const newVolume = Math.round((world.masterVolume - world.volumeIncrement) * 10) / 10
        world.masterVolume = newVolume >= 0 ? newVolume : 0
    }
}

function soundOptions() {
    window.world.stateService.send('SOUND')
}


export {
    splashScreen,
    mainMenu,
    howToMenu,
    pauseMenu,
    mainOptionsMenu,
    difficultyMenu,
    soundMenu,
}

