// Called by the game loop, this module will perform any state 
// calculations / updates to properly render the next frame


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
        // console.log('no game objects to update')
        return 
    }

    // console.log('updating game objects!')
    const gameObjects = state.gameObjects
    gameObjects.forEach((obj) => obj.update())
    const worldData = window.gameEngine.worldState
    worldData.forEach((obj) => obj.update())
}


export {
    gameUpdate
}