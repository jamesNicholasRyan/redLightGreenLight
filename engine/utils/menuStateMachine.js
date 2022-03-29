// A file that contains all logic for the game world state machine

import { Machine, interpret } from "xstate"

const stateMachine = Machine({
    id: 'gameState',
    initial: 'splashScreen',
    context: {
        retries: 0
    },
    states: {
        splashScreen: {
            on: {
                ENTER: 'mainMenu',
            }
        },
        mainMenu: {
            on: {
                STARTGAME: 'playing',
                OPTIONS: 'mainOptions',
                HOWTO: 'howTo',
                QUIT: 'quit',
            }
        },
        howTo: {
            on: {
                BACK: 'mainMenu'
            }
        },
        mainOptions: {
            on: {
                BACK: 'mainMenu',
                DIFFICULTY: 'difficulty',
                SOUND: 'sound'
            }
        },
        difficulty: {
            on: {
                BACK: 'mainOptions',
            }
        },
        sound: {
            on: {
                BACK: 'mainOptions',
            }
        },
        playing: {
            on: {
                PAUSE: 'pauseMenu',
            }
        },
        pauseMenu: {
            on: {
                BACK: 'playing',
                OPTIONS: 'pauseOptions',
                QUIT: 'quit',
                MAINMENU: 'mainMenu'
            }
        },
        pauseOptions: {
            on: {
                BACK: 'pauseMenu'
            }
        },
        quit: {
            type: 'final'
        }
    }
})

const stateService = interpret(stateMachine)
export default stateService.start()

