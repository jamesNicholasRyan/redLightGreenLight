import MainMenu from "../../engine/ui/menus/MainMenu"
import PauseMenu from "../../engine/ui/menus/PauseMenu"

const world = window.world

function mainMenu() {
    const world = window.world
    const mainMenu = new MainMenu('mainMenu', world.worldWidth, world.worldHeight, 0xa1788f, false)
    gameEngine.createGameObject(mainMenu, world.UIstr)
}

function pauseMenu() {
    const world = window.world
    const pauseMenuButtonData = [
        {
            'name': 'Back Button',
            'action': resumeGame,
            x: world.worldWidth*0.4,
            y: 200,
            w: 100,
            h: 50,
            fill: 0xffffff
        },
    ]
    const pauseMenu = new PauseMenu('pauseMenu', world.worldWidth, world.worldHeight, 0xa1788f, false, pauseMenuButtonData)
    console.log(pauseMenuButtonData)
    console.log(pauseMenu)
    gameEngine.createGameObject(pauseMenu, world.UIstr)
}

function resumeGame() {
    window.world.stateService.send('BACK')
}

// BUTTON DATA
// const pauseMenuButtonData = [
//     {
//         'name': 'Back Button',
//         'action': resumeGame,
//         x: world.worldWidth/2,
//         y: 200,
//         w: 100,
//         h: 30,
//         fill: 0xffffff
//     },
// ]

export {
    mainMenu,
    pauseMenu,
}

