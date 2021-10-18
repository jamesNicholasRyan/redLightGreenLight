// This module contains the game loop, which handles updating the game
// state and re-rendering the canvas
// (using the upadted state) at the configured FPS

function gameLoop (engine) {
    let loop = this
    
    // Main game rendering loop
    loop = function mainLoop( tFrame ) {
        // console.log('gameloop engine state: ', window.gameEngine.state)
        // Request a new animation frame
        // setting to 'stopLoop' so animation can be stopped via
        // 'window.cancelAnimationFrame( loop.stopLoop )'
        loop.stopLoop = window.requestAnimationFrame( loop )

        // update the game state
        engine.update()
        // Render the next frame
        engine.render(gameEngine.stage)
    }

    // Start off main loop
    // loop()

    return loop
}

export {
    gameLoop,
}