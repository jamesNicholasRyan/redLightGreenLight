import Menu from "../../engine/ui/Menu"

export function createMenus() {
    const world = window.world
    const mainMenu = new Menu(world.worldWidth, world.worldHeight, 0xa1788f, 1)
    gameEngine.createGameObject(mainMenu, world.UIstr)
   
}