import Button from "../../engine/ui/Button"
import MainMenu from "../../engine/ui/menus/MainMenu"
import PauseMenu from "../../engine/ui/menus/PauseMenu"


function mainMenu() {
    const world = window.world
    const mainMenu = new MainMenu('mainMenu', world.worldWidth, world.worldHeight, 0xa1788f, false)
    console.log(mainMenu)
    gameEngine.createGameObject(mainMenu, world.UIstr)
}

function pauseMenu() {
    const world = window.world
    const pauseMenu = new PauseMenu('pauseMenu', world.worldWidth, world.worldHeight, 0xa1788f, false)
    gameEngine.createGameObject(pauseMenu, world.UIstr)
}

export {
    mainMenu,
    pauseMenu,
}

