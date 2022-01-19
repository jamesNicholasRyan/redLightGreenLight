import Menu from "./Menu"

export default class MainMenu extends Menu {
    constructor(name, w, h, fill, active) {
        super(name, w, h, fill, active)
    }

    update() {
        this.checkGameState()
        super.update()
    }

    checkGameState() {
        // Checks the world/game state and responds appropriately
        if (world.stateService.state.matches('mainMenu')) return this.active = true
        this.active = false
    }
}