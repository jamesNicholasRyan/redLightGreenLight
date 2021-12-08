// This file contains all the logic for the girl/boss
// Which controls all the timings for the game loop


export default class Girl {
    constructor() {
        this.max = 2500
        this.min = 500
        this.startCounter = 3
        this.levelCounter = 300
        this.outOfTime = false
        this.minuteTimer
        this.redTimer
        this.greenTimer
    }

    update() {
        if ((this.levelCounter < 0) || (window.world.gameOver) || (window.world.gameWin)) {
            this.stopTimers()
        }
    }

    stopTimers() {
        // console.log('stopping timers')
        clearInterval(this.minuteTimer)
        clearTimeout(this.redTimer)
        clearTimeout(this.greenTimer)
    }

    startLevelCountDown() {
        // Count down for start of game
        window.gameEngine.redLight = true
        this.outOfTime = false
        const countDown = setInterval(() => {
            this.startCounter --
            // console.log(this.startCounter)
            if (this.startCounter < 0) {
                clearInterval(countDown)
                window.world.activateLevel()
            }
        }, 1000)
    }

    countDownFunc() {

    }


    levelTimer() {
        // This function lasts for 60 seconds, randomly setting 
        // lights as red or green
        window.gameEngine.redLight = false

        this.minuteTimer = setInterval(() => this.countDown(), 1000)

        this.redLight()
    }

    countDown() {
        // console.log('time: ', this.levelCounter)

        this.levelCounter = this.levelCounter - 1
        if (this.levelCounter <= 0) {            // If minute is up, stop
            clearInterval(this.minuteTimer)
            // console.log('out of time!!')
            window.world.gameOver = true
            this.outOfTime = true
        }
    }

    redLight() {                                             // GREEN LIGHT ON
        const rand = Math.floor(Math.random() * (2500 - 1000 + 1) + 1000)
        this.redTimer = setTimeout(() => {
            // console.log('GREEN LIGHT')
            window.gameEngine.redLight = true
            this.greenLight()
        }, rand)
    }

    greenLight() {                                          // RED LIGHT ON!
        this.greenTimer = setTimeout(() => {
            if (!window.world.gameOver || window.world.gameWin) {
                window.gameEngine.redLight = false
                this.redLight()
            }
        }, 4000)
    }

}