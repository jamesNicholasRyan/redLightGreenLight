import Menu from "./Menu"

export default class PauseMenu extends Menu {
    constructor(name, w, h, fill, active, buttonData) {
        super(name, w, h, fill, active, buttonData)
    }

    update() {
        this.checkGameState()
        super.update()
    }

    checkGameState() {
        // Checks the world/game state and responds appropriately
        if (world.stateService.state.matches('pauseMenu')) return this.active = true
        this.active = false
    }
}