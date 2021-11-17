// This file contains all the logic for the girl/boss
// Which controls all the timings for the game loop


export default class Girl {
    constructor() {
        this.max = 2500
        this.min = 500
    }

    startLevelCountDown() {
        // Count down for start of game
        window.gameEngine.redLight = true
        let counter = 3
        const countDown = setInterval(countDownFunc, 1000)

        function countDownFunc() {
            counter --
            console.log(counter)
            if (counter < 0) {
                clearInterval(countDown)
                window.world.activateLevel()
            }
        }
    }


    levelTimer() {
        // This function lasts for 60 seconds, randomly setting 
        // lights as red or green
        console.log('Level Timer')
        window.gameEngine.redLight = false

        let counter = 62
        const minuteTimer = setInterval(countDown, 1000)

        function countDown() {
            counter --
            if ((counter < 0) || (window.world.gameOver)) {                // If minute is up, stop
                clearInterval(minuteTimer)
            }
        }

        function redLight() {
            setTimeout(() => {
                console.log('red light')
                window.gameEngine.redLight = true
                greenLight()
            }, 2000)
        }

        function greenLight() {
            console.log(window.world.gameOver)
            if ((counter < 0) || (window.world.gameOver)) return
            var rand = Math.floor(Math.random() * (2500 - 1000 + 1) + 1000)
            setTimeout(function() {
                if (!window.world.gameOver) {
                    console.log('green light')
                    window.gameEngine.redLight = false
                    redLight()
                }
            }, rand)
        }

        redLight()
        // greenLight()
    }

}