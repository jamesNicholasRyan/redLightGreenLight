import World from './world.js'


window.onload = function() {
    const world = new World('World', 300, 300, 30)
    world.init()
    world.runGame()
}








