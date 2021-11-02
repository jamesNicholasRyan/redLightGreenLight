// This is where we initialize the game engine, creating the PixiJS canvas,
// bringing together all the elements of the game engine.

import * as PIXI from 'pixi.js'
import { gameUpdate } from './core/update.js'
import { gameRender } from './core/render.js'
import { gameLoop } from './core/loop.js'

import spriteSheet from './assets/man.png'

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
        this.worldState = []
        this.renderer = this.buildRenderer()
        this.loader = new PIXI.Loader

        // keyboard Controller
        this.keyW = false
        this.keyA = false
        this.keyS = false
        this.keyD = false
        this.spaceBar = false

        // GAMEPLAY VARIABLES
        this.redLight = false
        this.successLine = 0.05
        this.lose = false
        this.win = false

        //spriteSheets
        this.playerSheet = {}
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

    loadSprites() {
        this.loader.add('sheet', spriteSheet)
        this.loader.load(this.setupSpriteSheets())
    }

    setupSpriteSheets() {
        let sSheet = new PIXI.BaseTexture.from(this.loader.resources['sheet'].url)
        let w = 26
        let h = 36
        
        this.playerSheet["standSouth"] = [
            new PIXI.Texture(sSheet, new PIXI.Rectangle(1*w, 0, w, h))
        ]
        this.playerSheet["south"] = [
            new PIXI.Texture(sSheet, new PIXI.Rectangle(0*w, 0, w, h)),
            new PIXI.Texture(sSheet, new PIXI.Rectangle(1*w, 0, w, h)),
            new PIXI.Texture(sSheet, new PIXI.Rectangle(2*w, 0, w, h))
        ]
        this.playerSheet["west"] = [
            new PIXI.Texture(sSheet, new PIXI.Rectangle(3*w, 0, w, h)),
            new PIXI.Texture(sSheet, new PIXI.Rectangle(4*w, 0, w, h)),
            new PIXI.Texture(sSheet, new PIXI.Rectangle(5*w, 0, w, h))
        ]
        this.playerSheet["north"] = [
            new PIXI.Texture(sSheet, new PIXI.Rectangle(6*w, 0, w, h)),
            new PIXI.Texture(sSheet, new PIXI.Rectangle(7*w, 0, w, h)),
            new PIXI.Texture(sSheet, new PIXI.Rectangle(8*w, 0, w, h))
        ]
        this.playerSheet["east"] = [
            new PIXI.Texture(sSheet, new PIXI.Rectangle(9*w, 0, w, h)),
            new PIXI.Texture(sSheet, new PIXI.Rectangle(10*w, 0, w, h)),
            new PIXI.Texture(sSheet, new PIXI.Rectangle(11*w, 0, w, h))
        ]
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
        // console.log('adding game object')
        const graphics = object.createDisplay()
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

}
