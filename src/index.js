import World from './world.js'


window.onload = function() {
    const world = new World('World', 700, 800, 30)
    world.init()
    world.runGame()
}








