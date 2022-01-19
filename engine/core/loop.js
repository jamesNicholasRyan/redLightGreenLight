// This module contains the game loop, which handles updating the game
// state and re-rendering the canvas
// (using the upadted state) at the configured FPS

function gameLoop (engine) {
    let loop = this
    // const then = engine.then

    // Main game rendering loop
    loop = function mainLoop( tFrame ) {
        // Request a new animation frame
        // setting to 'stopLoop' so animation can be stopped via
        // 'window.cancelAnimationFrame( loop.stopLoop )'
        loop.stopLoop = window.requestAnimationFrame( loop )

        // FPS logic:
        let now = Date.now();
        let then
        let first = true
        if (first) {
            then = engine.then
            first = false
        } else {
            then = then
        }
        let elapsed = now - then
        const fpsInterval = 1000/engine.targetFps

        // console.log('elapsed: ', elapsed)
        console.log('fpsInterval: ', fpsInterval)
        if (elapsed > fpsInterval) {
            // console.log('frame')
            // Get ready for next frame by setting then=now, but...
            // Also, adjust for fpsInterval not being multiple of 16.67
            then = now - (elapsed % fpsInterval)

            // update the game state
            engine.update()
            // Render the next frame
            engine.render(gameEngine.stage)
        }
    }

    // Start off main loop
    // loop()

    return loop
}

export {
    gameLoop,
}