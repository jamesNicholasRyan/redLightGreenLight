// A file that contains all logic for the game world state machine

import { Machine, interpret } from "xstate"

const stateMachine = Machine({
    id: 'gameState',
    initial: 'mainMenu',
    context: {
        retries: 0
    },
    states: {
        mainMenu: {
            on: {
                STARTGAME: 'playing',
                OPTIONS: 'mainOptions',
                QUIT: 'quit'
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

