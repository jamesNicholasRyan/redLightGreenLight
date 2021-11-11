// this file contains all the logic for the girl/boss


export default class Girl {
    construtor() {

    }

    randomTimer() {
        // This function returns either GREEN or RED
        setTimeout(() => {
            window.gameEngine.redLight = false
            green()
        }, 7000)
        const green = () => setTimeout(() => {
            window.gameEngine.redLight = true
            this.randomTimer()
        }, 1000)
    }
}