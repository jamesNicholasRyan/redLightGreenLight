import Menu from "./Menu"

export default class PauseMenu extends Menu {
    constructor(w, h, fill, active) {
        super(w, h, fill, active)
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