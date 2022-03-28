// This is where we initialize the game engine, creating the PixiJS canvas,
// bringing together all the elements of the game engine.

import * as PIXI from 'pixi.js'
import { gameUpdate } from './core/update.js'
import { gameRender } from './core/render.js'
import { gameLoop } from './core/loop.js'

import spriteSheet from './assets/man.png'
import headSpriteSheet from './assets/girl_head.png'

const gameEngine = window.gameEngine


export default class Engine {

    constructor(canvasHTML, width, height, targetFps, showFps){
        this.canvasHTML = canvasHTML,
        this.width = width,
        this.height = height,
        this.targetFps = targetFps,
        this.then = Date.now()
        this.showFps = showFps,
        this.backgroundsStage = new PIXI.Container()
        this.gameObjectsStage = new PIXI.Container()
        this.UIelementsStage = new PIXI.Container()
        this.particlesStage = new PIXI.Container()
        this.stages = [this.backgroundsStage, this.gameObjectsStage, this.particlesStage, this.UIelementsStage]
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
        this.arrowLeft = false
        this.arrowUp = false
        this.arrowRight = false
        this.arrowDown = false

        // GAMEPLAY VARIABLES
        this.redLight = true
        this.successLine = 0.1
        this.lose = false
        // this.win = false

        //spriteSheets
        this.playerSheet = {}
        this.headSheet = {}
        this.UIsprite = {}
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
        this.addContainersToStage([this.backgroundsStage, this.particlesStage, this.gameObjectsStage, this.UIelementsStage])
        this.renderer.render(this.stage)
        return this.renderer.view
    }

    loadSprites() {
        this.loader.add('sheet', spriteSheet)
        this.loader.add('headSheet', headSpriteSheet)
        this.loader.load(this.setupSpriteSheets())
    }

    setupSpriteSheets() {

        // Man sprites
        let sSheet = new PIXI.BaseTexture.from(this.loader.resources['sheet'].url)
        let w = 26
        let h = 36
        
        this.playerSheet["standSouth"] = [
            new PIXI.Texture(sSheet, new PIXI.Rectangle(1*w, 0, w, h))
        ]
        this.playerSheet["standNorth"] = [
            new PIXI.Texture(sSheet, new PIXI.Rectangle(7*w, 0, w, h))
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
        this.playerSheet["dead"] = [
            new PIXI.Texture(sSheet, new PIXI.Rectangle(12*w, 0, w*2, h))
        ]

        // Optional texture sharpen
        // Object.keys(this.playerSheet).forEach((position) => {
        //     this.playerSheet[position].forEach((sheet) => {
        //         sheet.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
        //     })
        // })

        // Girl head sprites
        let headSpriteSheet = new PIXI.BaseTexture.from(this.loader.resources['headSheet'].url)
        let width = 59
        let height = 72
        this.headSheet["headForward"] = [
            new PIXI.Texture(headSpriteSheet, new PIXI.Rectangle(0*width, 0, width, height)),
            new PIXI.Texture(headSpriteSheet, new PIXI.Rectangle(1*width, 0, width, height)),
            new PIXI.Texture(headSpriteSheet, new PIXI.Rectangle(2*width, 0, width, height)),
            new PIXI.Texture(headSpriteSheet, new PIXI.Rectangle(1*width, 0, width, height)),
        ]
        this.headSheet["headBackwards"] = [
            new PIXI.Texture(headSpriteSheet, new PIXI.Rectangle(3*width, 0, width, height))
        ]

    }

    createGameObject(object, type) {
        const graphics = object.createDisplay()
        this.addToStage(graphics, type)
        this.addToState(object, type)
    }

    addToStage(child, type) {
        if (type === 'backgrounds') this.backgroundsStage.addChild(child)
        if (type === 'particles') this.particlesStage.addChild(child)
        if (type === 'gameObject') this.gameObjectsStage.addChild(child)
        if (type === 'UI' || type === 'buttons') this.UIelementsStage.addChild(child)
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
        } else if (type === 'UI') {
            if (!this.state.ui) {
                this.state = {
                    ...this.state,
                    ui: [object]
                }
            } else {
                this.state.ui.push(object)
            }
        } else if (type === 'buttons') {
            if (!this.state.buttons) {
                this.state = {
                    ...this.state,
                    buttons: [object]
                }
            } else {
                this.state.buttons.push(object)
            }
        } else if (type === 'particles') {
            if (!this.state.particles) {
                this.state = {
                    ...this.state,
                    particles: [object]
                }
            } else {
                this.state.particles.push(object)
            }
        } else if (type === 'backgrounds') {
            if (!this.state.backgrounds) {
                this.state = {
                    ...this.state,
                    backgrounds: [object]
                }
            } else {
                this.state.backgrounds.push(object)
            }
        }
    }

    findInStateName(type, name) {
        // Find an object related to the type and name provided
        const typeState = this.state[type]
        return typeState.filter((obj) => obj.name === name)[0]
    }

    findIndexStateId(type, id) {
        // Find index of an object in state related to the type and id provided
        const typeState = this.state[type]
        return typeState.findIndex((obj) => {
            return obj.id === id
        })
    }

    addContainersToStage(containers) {
        containers.forEach((container) => {
            this.stage.addChild(container)
        })
    }

    removeGameObject(object, type) {
        // Remove all references of the game object from the state & stage
        const index = this.findIndexStateId(type, object.id)
        this.state[type].splice(index,1)
        const stageArray = ['backgrounds', 'particles', 'gameObjects']
        const stageIndex = stageArray.indexOf(type)
        const stage = this.stage.getChildAt(stageIndex)
        stage.removeChild(object.container)
    }

    mouseClicked(mousePosition) {
        // loop UI elements
        // check if mouse is over any of them?
        const UIelements = this.state.ui
        if (!UIelements) return
        for (let i=UIelements.length-1; i>=0; i--) {   // Loop backwards, to select top most UI...
            const element = UIelements[i]
            if (!element.active) continue
            if (!element.checkMouseOver) continue
            if (element.checkMouseOver(mousePosition)) {
                if (element.action) element.action()
                return
            }    
        }
    }

    resetEngine() {
        this.redLight = true
        this.clearState()
        this.addContainersToStage([this.backgroundsStage, this.particlesStage, this.gameObjectsStage, this.UIelementsStage])
    }

    clearState() {
        this.state = {}
        this.gameObjectsStage = new PIXI.Container()
        this.UIelementsStage = new PIXI.Container()
        this.stage = new PIXI.Container()
    }

    orderObjects() {
        // This method orders the game objects
        const gameObjectsContainer = this.stage.getChildAt(2)
        gameObjectsContainer.children.sort((a, b) => {
            const globalPosA = a.toGlobal(new PIXI.Point(0,0))
            const globalPosB = b.toGlobal(new PIXI.Point(0,0))
            return globalPosA.y - globalPosB.y
        })
    }

    update() {
        // console.log('update method state: ', window.gameEngine.state)
        gameUpdate()
    }

    // update = gameUpdate(this.state)

    render = gameRender(this)

    loop = gameLoop(this)

}
