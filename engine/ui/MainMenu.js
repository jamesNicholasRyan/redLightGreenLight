import Menu from "./Menu"

export default class MainMenu extends Menu {
    constructor(w, h, fill, alpha) {
        super(w, h, fill, alpha)
        this.active = false
    }
}