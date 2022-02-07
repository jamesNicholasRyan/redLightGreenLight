// A file that contains all logic for the clock state machine

import { Machine, interpret } from "xstate"


const clockStateMachine = Machine({
    id: 'clockState',
    initial: 'stopped',
    context: {
        retries: 0
    },
    states: {
        stopped: {
            on: {
                START: 'ticking',
            }
        },
        ticking: {
            on: {
                PAUSE: 'paused',
                STOP: 'stopped',
            }
        },
        paused: {
            on: {
                RESUME: 'ticking',
                STOP: 'stopped'
            }
        },
    }
})

const clockStateService = interpret(clockStateMachine)
export default clockStateService.start()
