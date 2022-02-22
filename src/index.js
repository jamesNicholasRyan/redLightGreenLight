import World from './world.js'


window.onload = function() {
    const innerHeight = window.innerHeight
    const width = (innerHeight / 0.9) - 20
    window.world = new World('World', width, width*0.9, 30)
    // window.world = new World('World', 1000, 900, 30)
    world.init()
    world.runGame()
}








