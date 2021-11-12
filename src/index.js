import World from './world.js'


window.onload = function() {
    window.world = new World('World', 1000, 900, 30)
    world.init()
    world.runGame()
}








