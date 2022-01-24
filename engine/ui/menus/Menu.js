import * as PIXI from 'pixi.js'


export default class Menu {
    constructor(name, w, h, fill, active, parsedButtonData, fadeSpeed=0.15, backgroundFadeSpeed=0.2) {
        this.name = name
        this.width = w
        this.height = h
        this.fill = fill
        this.alpha = 0
        this.backgroundAlpha = 0
        this.graphics = new PIXI.Graphics()
        this.buttonsGraphics = new PIXI.Graphics()
        this.sprites = new PIXI.Container()
        this.container = new PIXI.Container()
        this.active = active
        this.fadeSpeed = fadeSpeed
        this.backgroundFadeSpeed = backgroundFadeSpeed
        this.buttonData = parsedButtonData
    }

    createDisplay() {
        this.graphics.drawRect(0,0, this.width, this.height, this.fill)
        this.createSprites()
        this.drawButtons()
        this.container.addChild(this.graphics)
        this.container.addChild(this.buttonsGraphics)
        this.container.addChild(this.sprites)
        return this.container
    }

    createSprites() {
        if (!this.buttonData) return
        this.buttonData.forEach((button) => {
            const newTexture = new PIXI.Texture.from(button.sprite)
            const newSprite = new PIXI.Sprite(newTexture)
            this.sprites.addChild(newSprite)
        })
    }
    
    display() {
        this.drawButtons()
        this.graphics.beginFill(this.fill, this.backgroundAlpha)
        this.graphics.drawRect(0,0, this.width, this.height)
        this.graphics.endFill()
    }

    drawButtons() {
        if (!this.buttonData) return
        this.buttonData.forEach((data, index) => {
            const relativeSprite = this.sprites.getChildAt(index)
            relativeSprite.anchor.set(0.5)
            relativeSprite.position.x = data.x
            relativeSprite.position.y = data.y
            relativeSprite.alpha = this.alpha
        })
    }

    update() {
        this.checkGameState()
        if (this.active) {
            this.fadeIn(this.fadeSpeed)
            this.fadeInBackground(this.backgroundFadeSpeed)
        } else {
            this.fadeOut(this.fadeSpeed)
            this.fadeOutBackground(this.backgroundFadeSpeed)
        }
    }

    checkGameState() {
        // Checks the world/game state and responds appropriately
        if (world.stateService.state.matches(this.name)) return this.active = true
        this.active = false
    }

    fadeIn(speed) {
        if (this.alpha >= 1) return this.alpha=1
        this.alpha += speed
    }
    fadeInBackground(speed) {
        if (this.backgroundAlpha >= 1) return this.backgroundAlpha=1
        this.backgroundAlpha += speed
    }

    fadeOut(speed) {
        if (this.alpha <= 0) return this.alpha=0
        this.alpha -= speed
    }
    fadeOutBackground(speed) {
        if (this.backgroundAlpha <= 0) return this.backgroundAlpha=0
        this.backgroundAlpha -= speed
    }

    checkMouseOver(mousePosition) {
        let answer = false

        for (let i=0; i<=this.buttonData.length-1; i++) {
            const sprite = this.sprites.getChildAt(i)
            if (sprite.containsPoint(mousePosition)) {
                this.buttonData[i].action()
                answer = true
            }
        }

        if (this.isSprite) { // If this element is a sprite, use the Sprite.containsPoint()
            return this.sprite.containsPoint(mousePosition)
        }

        return answer
    }
}