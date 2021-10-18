import initializeGame from '../engine/init.js'
import World from './world.js'

function init() {
    const initializedGame = initializeGame(window.innerWidth, window.innerHeight, 30, true)
    document.body.appendChild(initializedGame)
}

window.onload = function() {
    init()
    const world = new World('Country', 300, 300, 30)
    world.runGame()
}






