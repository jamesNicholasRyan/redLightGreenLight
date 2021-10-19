// This is where we initialize the game engine, creating the PixiJS canvas,
// bringing together all the elements of the game engine.

import * as PIXI from 'pixi.js'
import { gameUpdate } from './core/update.js'
import { gameRender } from './core/render.js'
import { gameLoop } from './core/loop.js'

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

        // keyboard Controller
        this.keyW = false
        this.keyA = false
        this.keyS = false
        this.keyD = false
        this.spaceBar = false
    }

    buildRenderer() {
        const renderer = PIXI.autoDetectRenderer({
            view: this.canvasHTML,
            width: this.width,
            height: this.height,
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
        if (type === 'gameObject') {
            if (!this.state.gameObjects) {
                this.state = {
                    ...this.state,
                    gameObjects: [object]                
                }
            } else {
                this.state.gameObjects.push(object)
            }
        }
    }

    createGameObject(object) {
        console.log('adding game object')
        const graphics = object.display()
        this.addToStage(graphics)
        this.addToState(object, 'gameObject')
    }

    update() {
        // console.log('update method state: ', window.gameEngine.state)
        gameUpdate()
    }

    // update = gameUpdate(this.state)

    render = gameRender(this)

    loop = gameLoop(this)

    // // STATIC
    // createContainer() {
    //     // create a new container
    //     const newContainer = new PIXI.Container()
    //     return newContainer
    // }

    // // createSprite(path) {
    // //     // create a new PIXI Sprite
    // //     const sprite
    // //     sprite = new PIXI.Sprite.from(path)
    // //     return sprite
    // // }

    // createTexture(path) {
    //     // create a new PIXI texture from a string path to a PNG
    //     const newTexture = new PIXI.Texture.fromImage(path)
    //     return newTexture
    // }

    // drawTile(x, y, w) {
    //     // temp function that draws tiles
    //     const graphics = new PIXI.Graphics()
    //     graphics.beginFill(0xFFFF00)
    //     graphics.lineStyle(5, 0xFF0000)
    //     graphics.drawRect(x, y, w, w)
    //     return graphics
    // }

    // moveStage(direction) {
    //     if (direction === 'right'){
    //         this.stage.position.x -=10
    //     } else if (direction === 'down') {
    //         this.stage.position.y -=10
    //     } else if (direction === 'left') {
    //         this.stage.position.x +=10
    //     } else if (direction === 'up') {
    //         this.stage.position.y +=10
    //     }
    // }

}
