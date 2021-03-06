// This file contains all the logic for the girl/boss
// Which controls all the timings for the game loop

import clockStateService from '../utils/clockStateMachine.js'
import randomNumGen from '../utils/randomNumberGen.js'

export default class Girl {
    constructor(name) {
        this.name = name
        this.max = 4000
        this.min = 2500
        this.startCounter = 3
        // this.levelCounter = 300
        this.levelTimerOn = false
        this.outOfTime = false
        this.minuteTimer
        this.redTimer
        this.greenTimer

        // CLOCK
        this.clockStateService = clockStateService
        this.frameInterval = 60
        this.clock = 1
        this.levelCounter = 60
        this.countdown = 3
        this.then = 0
        this.lightinterval = 100
        this.lightsActive = false
    }

    update() {
        if (this.clockStateService.state.matches('ticking')) {
            this.incrementClock()
            this.checkLights()
            this.checkTimer()
        } else if (this.clockStateService.state.matches('paused')) {

        } else if (this.clockStateService.state.matches('stopped')) {
            window.gameEngine.redLight = true
            this.levelCounter = 0
            this.clock = 0
        }

    }

    incrementClock() {
        this.clock++
        if (this.clock % this.frameInterval === 0) {
            // This happens every second
            if (this.countdown !== 0) this.countdown --
            if (this.countdown === 0) {
                this.levelCounter --
                this.lightsActive = true
            }
        }
    }

    swtichLights() {
        window.gameEngine.redLight = !window.gameEngine.redLight
        if (!window.gameEngine.redLight) {
            const randNum = Math.round(randomNumGen(1, 2))
            const mp3 = `green_${randNum}`
            window.audioController.playSound(mp3)
        } else {
            const randNum = Math.round(randomNumGen(1, 2))
            const mp3 = `red_${randNum}`
            window.audioController.playSound(mp3)
        }
    }

    checkLights() {
        // This method will check the clock against random numbers
        if (!this.lightsActive) return
        if (!window.world.isLevelActive) window.world.activateLevel()
        const now = this.clock
        const diff = now - this.then
        if (diff >= this.lightinterval) {
            this.swtichLights()
            this.then = this.clock
            if (window.gameEngine.redLight ) {
                this.lightinterval = 240
            } else {
                this.lightinterval = randomNumGen(100, 200)
            }
        }
    }

    checkTimer() {
        if (this.levelCounter >= 0) return
        window.world.gameOver = true
        this.outOfTime = true
    }

}