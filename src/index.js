import World from './world.js'


window.onload = function() {
    const innerHeight = window.innerHeight
    const innerWidth = window.innerWidth
    let width = (innerHeight / 0.9) - 80
    if (innerWidth < width) {
        width = innerWidth - 80
    }
    window.world = new World('World', width, width*0.9, 30)
    world.init()
    world.runGame()
}








