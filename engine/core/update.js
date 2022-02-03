// Called by the game loop, this module will perform any state 
// calculations / updates to properly render the next frame

import Engine from "../engine"


// function gameUpdate( s ) {

//     return function update( tFrame ) {
//         const state = s || {}
//         console.log('state: ', state)

//         // If there are gameObjects, iterate through them and call their 'update' methods
//         if (!state.hasOwnProperty('gameObjects')) { 
//             console.log('no game objects to update')
//             return 
//         } 

//         console.log('updating game objects!')
//         const gameObjects = state.gameObjects
//         gameObjects.forEach((obj) => obj.update())

//         return state
//     }
// }

function gameUpdate() {
    const state = window.gameEngine.state || {}
    // console.log('state: ', state)

    // If there are gameObjects, iterate through them and call their 'update' methods
    if (!state.hasOwnProperty('gameObjects')) { 
        return 
    }

    // console.log('updating game objects!')
    const gameObjects = state.gameObjects
    const backgrounds = state.backgrounds
    const uiObjects = state.ui
    const buttonObjects = state.buttons
    const particleObjects = state.particles
    gameObjects.forEach((obj) => obj.update())
    backgrounds.forEach((obj) => obj.update())
    uiObjects.forEach((obj) => obj.update())
    if (buttonObjects) buttonObjects.forEach((obj) => obj.update())

    if (particleObjects && particleObjects.length > 0) {   // Garbage collection for particles
        for (let i=particleObjects.length-1; i>=0; i--) {
            const particle = particleObjects[i]
            particle.update()
            if (particle.garbageCollection()) {
                // Remove particles from STAGE
                particle.graphics.parent.removeChild(particle.graphics)
                // Remove particles from STATE
                const index = particleObjects.indexOf(particle)
                particleObjects.splice(index, 1)
            }
        }
    }

    const worldData = window.gameEngine.worldState
    worldData.forEach((obj) => obj.update())
}


export {
    gameUpdate
}