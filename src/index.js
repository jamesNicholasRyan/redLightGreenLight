import World from './world.js'


window.onload = function() {
    window.world = new World('World', 1200, 1100, 30)
    world.init()
    world.runGame()
}








