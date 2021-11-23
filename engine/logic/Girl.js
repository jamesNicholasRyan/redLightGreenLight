// This file contains all the logic for the girl/boss
// Which controls all the timings for the game loop


export default class Girl {
    constructor() {
        this.max = 2500
        this.min = 500
        this.startCounter = 3
        this.levelCounter = 30
        this.outOfTime = false
        this.minuteTimer
        this.redTimer
        this.greenTimer
    }

    update() {
        if ((this.lCounter < 0) || (window.world.gameOver) || (window.world.gameWin)) {
            this.stopTimers()
        }
    }

    stopTimers() {
        console.log('stopping timers')
        clearInterval(this.minuteTimer)
        clearTimeout(this.redTimer)
        clearTimeout(this.greenTimer)
    }

    startLevelCountDown() {
        // Count down for start of game
        window.gameEngine.redLight = true
        this.outOfTime = false
        let sCounter = this.startCounter
        const countDown = setInterval(countDownFunc, 1000)

        function countDownFunc() {
            sCounter --
            console.log(sCounter)
            if (sCounter < 0) {
                clearInterval(countDown)
                window.world.activateLevel()
            }
        }
    }


    levelTimer() {
        // This function lasts for 60 seconds, randomly setting 
        // lights as red or green
        window.gameEngine.redLight = false

        let lCounter = this.levelCounter
        this.minuteTimer = setInterval(countDown, 1000)
        let rTimer = this.redTimer
        let gTimer = this.greenTimer

        function countDown() {
            console.log('time: ', lCounter)
            lCounter --
            if (lCounter <= 0) {            // If minute is up, stop
                clearInterval(minuteTimer)
                console.log('out of time!!')
                window.world.gameOver = true
                this.outOfTime = true
            }
        }

        function redLight() {                                             // GREEN LIGHT ON
            var rand = Math.floor(Math.random() * (2500 - 1000 + 1) + 1000)
            console.log(rand)
            rTimer = setTimeout(() => {
                console.log('GREEN LIGHT')
                window.gameEngine.redLight = true
                greenLight()
            }, rand)
        }

        function greenLight() {                                          // RED LIGHT ON!
            gTimer = setTimeout(function() {
                if (!window.world.gameOver || window.world.gameWin) {
                    window.gameEngine.redLight = false
                    redLight()
                }
            }, 4000)
        }

        redLight()
    }

}