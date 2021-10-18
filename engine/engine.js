// This is where we initialize the game engine, creating the PixiJS canvas,
// bringing together all the elements of the game engine.

import * as PIXI from 'pixi.js'
import { gameUpdate } from './core/update.js'
import { gameRender } from './core/render.js'
import { gameLoop } from './core/loop.js'
import Global from './utils/globals.js'

const gameEngine = window.gameEngine

export default class Engine {

    constructor(canvasHTML, width, height, targetFps, showFps){
        this.canvasHTML = canvasHTML,
        this.width = width,
        this.height = height,
        this.targetFps = targetFps,
        this.showFps = showFps,
        this.stage = new PIXI.Container()
        this.containers = []
        this.state = {}
        this.renderer = this.buildRenderer()
    }

    buildRenderer() {
        const renderer = PIXI.autoDetectRenderer({
            view: this.canvasHTML,
            width: this.width*0.9,
            height: this.height*0.8,
            backgroundColor: 0x808080,
            antialias: true,
        })
        return renderer
    }

    pixiRender() {
        this.renderer.render(this.stage)
        return this.renderer.view
    }

    addToStage(child) {
        // console.log('adding to stage')
        this.stage.addChild(child)
    }

    addToState(object, type) {
        console.log('attempting to add object to state...')
        if (type === 'gameObject') {
            console.log('object is gameOjbect')
            if (!this.state.gameObjects) {
                console.log('creating new state object')
                this.state = {
                    ...this.state,
                    gameObjects: [object]                
                }
            } else {
                console.log('existing state')
                this.state.gameObjects.push(object)
            }
        }
        console.log('after add to state: ', this.state)
    }

    update() {
        // console.log('update method state: ', window.gameEngine.state)
        gameUpdate()
    }

    // update = gameUpdate(this.state)

    render = gameRender(this)

    loop = gameLoop(this)

    createGameObject(object) {
        console.log('adding game object')
        const graphics = object.display()
        this.addToStage(graphics)
        this.addToState(object, 'gameObject')
    }

    // STATIC
    createContainer() {
        // create a new container
        const newContainer = new PIXI.Container()
        return newContainer
    }

    // createSprite(path) {
    //     // create a new PIXI Sprite
    //     const sprite
    //     sprite = new PIXI.Sprite.from(path)
    //     return sprite
    // }

    createTexture(path) {
        // create a new PIXI texture from a string path to a PNG
        const newTexture = new PIXI.Texture.fromImage(path)
        return newTexture
    }

    drawTile(x, y, w) {
        // temp function that draws tiles
        const graphics = new PIXI.Graphics()
        graphics.beginFill(0xFFFF00)
        graphics.lineStyle(5, 0xFF0000)
        graphics.drawRect(x, y, w, w)
        return graphics
    }

    moveStage(direction) {
        if (direction === 'right'){
            this.stage.position.x -=10
        } else if (direction === 'down') {
            this.stage.position.y -=10
        } else if (direction === 'left') {
            this.stage.position.x +=10
        } else if (direction === 'up') {
            this.stage.position.y +=10
        }
    }

}

// export default function engine(canvasHTML, width, height, targetFps, showFps) {
//     console.log('building game engine')

//     // global variables
//     constants = {
//         width: width,
//         height: height,
//         targetFps: targetFps,
//         showFps: showFps
//     }

    
//     const renderer = PIXI.autoDetectRenderer({
//         view: canvasHTML,
//         width: width*0.9,
//         height: height*0.8,
//         backgroundColor: 0xffffff,
//         antialias: true,
//     })
//     console.log(renderer)

//     const stage = new PIXI.Container()
//     const graphics = new PIXI.Graphics()

//     const x = renderer.width/2
//     const y = renderer.height/2
    
//     const man = new Man(x, y, 185, 40)
//     const man2 = man.createMan(graphics)

//     stage.addChild(man2)

//     // const update = gameUpdate( constants, state )
//     // const render = gameRender( this )
//     // const loop = gameLoop( this )

//     renderer.render(stage)
//     return renderer.view
// }


// class Man {

//     constructor(x, y, a, b) {
//         this.x = x,
//         this.y = y,
//         this.a = a,
//         this.b = b
//     }


//     createMan(graphics) {
//         // const graphics = new PIXI.Graphics()
//         graphics.beginFill(0xe74c3c)
//         graphics.drawCircle(this.x, this.y, this.a, this.b)
//         graphics.endFill()

//         return graphics
//     }

//     update() {
//         this.x += 1
//     }
// }
