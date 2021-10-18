import * as PIXI from 'pixi.js'
import MouseController from '../engine/inputOuput/mouseController'

// import Unit from './gameObjects/Unit'



export default class World {

    constructor(name, width, height, tileWidth) {
        this.name = name
        this.worldWidth = width
        this.worldHeight = height
        this.tileWidth = tileWidth
        this.tiles = []
    }

    runGame() {
        console.log('game engine: ', gameEngine)

        // const man = new Unit(gameEngine.width/2, gameEngine.height/2, 30, 30, 0, 0, 0x025666)
        // const man2 = new Unit(gameEngine.width/3, gameEngine.height/2, 30, 30, 0, 0, 0x025666)
        
        // gameEngine.createGameObject(man)
        // gameEngine.createGameObject(man2)
    
        console.log(gameEngine.state)
        gameEngine.loop()
    
        const listener = window.addEventListener('click', function(event) {  
            console.log('************ incrementing loop ************')                        
            gameEngine.loop()
            console.log(gameEngine.state.gameObjects[0])
            window.cancelAnimationFrame( gameEngine.loop.stopLoop )   
        })

        // this.tileMap()
    }

    // tileMap() {
    //     // builds the tile map of the world
    //     // const texture = gameEngine.createTexture('./sprites/theman.png')
    //     // const sprite = gameEngine.createSprite('./sprites/theman.png')
    //     const tileContainer = gameEngine.createContainer()
    //     window.mouseController.backgroundContainers.push(tileContainer)
    //     console.log(window.mouseController.backgroundContainers)

    //     for (let i=0; i<this.worldWidth; i=i+this.tileWidth) {
    //         for (let j=0; j<this.worldHeight; j=j+this.tileWidth) {
    //             console.log(`creating a tile at ${i}, ${j}`)
    //             const tile = gameEngine.drawTile(i, j, this.tileWidth)
    //             tileContainer.addChild(tile)
    //         }
    //     }

    //     gameEngine.addToStage(tileContainer)
    // }

}

