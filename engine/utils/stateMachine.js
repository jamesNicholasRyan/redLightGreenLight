// A file that contains all logic for the game world state machine

import { Machine, interpret } from "xstate"

const stateMachine = Machine({
    id: 'gameState',
    initial: 'playing',
    context: {
        retries: 0
    },
    states: {
        mainMenu: {
            on: {
                STARTGAME: 'playing',
                OPTIONS: 'options',
                QUIT: 'quit'
            }
        },
        options: {
            on: {
                BACK: 'mainMenu'
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
                OPTIONS: 'options',
                QUIT: 'quit',
                MAINMENU: 'mainMenu'
            }
        },
        quit: {
            type: 'final'
        }
    }
})

const stateService = interpret(stateMachine)
export default stateService.start()

