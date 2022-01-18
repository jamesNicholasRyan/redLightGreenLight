import Menu from "./Menu"

export default class MainMenu extends Menu {
    constructor(w, h, fill, alpha) {
        super(w, h, fill, alpha)
    }

    update() {
        this.checkGameState()
        super.update()
    }

    checkGameState() {
        // Checks the world/game state and responds appropriately
        if (world.stateService.state.matches('mainMenu')) {
            console.log('PAUSED')
            return this.active = true
        }
        this.active = false
    }
}