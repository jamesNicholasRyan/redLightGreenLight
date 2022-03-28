import * as PIXI from 'pixi.js'


export default class Menu {
    constructor(name, w, h, fill, active, parsedButtonData, fadeSpeed=0.15, backgroundFadeSpeed=0.2, background, backgroundColor=false, textData, 
        logoPNG, lWidth, lHeight, lX, lY) {
        this.name = name
        this.ratio = world.ratio
        this.width = w
        this.height = h
        this.fill = fill
        this.alpha = 0
        this.backgroundAlpha = 0
        this.graphics = new PIXI.Graphics()
        this.buttonData = parsedButtonData
        this.buttonsGraphics = new PIXI.Graphics()
        this.sprites = new PIXI.Container()
        this.textData = textData
        this.text = new PIXI.Container()
        this.backgroundTexture = background ? new PIXI.Texture.from(background) : null
        this.backgroundSprite = null
        this.logoTexture = logoPNG ? new PIXI.Texture.from(logoPNG) : null
        this.logoSprite = null
        this.logoWidth = lWidth
        this.logoHeight = lHeight
        this.logoX = lX
        this.logoY = lY
        this.container = new PIXI.Container()
        this.active = active
        this.fadeSpeed = fadeSpeed
        this.backgroundFadeSpeed = backgroundFadeSpeed
        this.backgroundColor = backgroundColor
    }

    createDisplay() {
        this.graphics.beginFill(this.fill)
        this.graphics.drawRect(0,0, this.width, this.height)
        this.graphics.endFill()
        this.createSprites()
        this.createText()
        if (this.backgroundTexture) {
            this.backgroundTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
            this.backgroundSprite = new PIXI.Sprite(this.backgroundTexture)
            this.container.addChild(this.backgroundSprite)
        }
        if (this.logoTexture) {
            this.logoTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
            this.logoSprite = new PIXI.Sprite(this.logoTexture)
            this.container.addChild(this.logoSprite)
        }
        this.container.addChild(this.graphics)
        this.container.addChild(this.buttonsGraphics)
        this.container.addChild(this.sprites)
        this.container.addChild(this.text)
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

    createText() {
        if (!this.textData) return
        this.textData.forEach((text) => {
            const newText = new PIXI.Text(text.text, {fontFamily : 'Arial', fontSize: text.fontSize, fill : text.fill, align : 'center'})
            this.text.addChild(newText)
        })
    }
    
    display() {
        if (this.backgroundTexture) this.drawBackgroundSprite()
        if (this.logoTexture) this.drawLogoSprite()
        this.drawButtons()
        this.drawText()
        if (this.backgroundColor && this.active) {
            this.graphics.beginFill(this.fill, 0.4)
            this.graphics.drawRect(0,0, this.width, this.height)
            this.graphics.endFill()
        }
    }

    drawButtons() {
        const ratio = window.world.ratio
        if (!this.buttonData) return
        this.buttonData.forEach((data, index) => {
            const relativeSprite = this.sprites.getChildAt(index)
            relativeSprite.anchor.set(0.5)
            relativeSprite.position.x = data.x
            relativeSprite.position.y = data.y
            relativeSprite.alpha = this.alpha
            if (this.name == 'difficulty' && window.world.level == index) {
                relativeSprite.width = 320 *ratio
                relativeSprite.height = 130 *ratio
            } else {
                relativeSprite.width = data.w
                relativeSprite.height = data.h
            }
        })
    }

    drawText() {
        if (!this.textData) return
        this.textData.forEach((text, index) => {
            const relativeText = this.text.getChildAt(index)
            relativeText.anchor.set(0.5)
            relativeText.position.x = text.x
            relativeText.position.y = text.y
            relativeText.alpha = this.alpha
            relativeText.text = text.getText()
        })
    }

    drawBackgroundSprite() {
        this.backgroundSprite.position.x = 0
        this.backgroundSprite.position.y = 0
        this.backgroundSprite.width = window.world.worldWidth
        this.backgroundSprite.height = window.world.worldWidth*0.9
        this.backgroundSprite.alpha = this.backgroundAlpha
    }


    drawLogoSprite() {
        this.logoSprite.position.x = this.logoX * this.ratio
        this.logoSprite.position.y = this.logoY * this.ratio
        this.logoSprite.width = this.logoWidth * this.ratio
        this.logoSprite.height = this.logoHeight * this.ratio
        this.logoSprite.alpha = this.backgroundAlpha
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
                window.audioController.playSound('button')
                answer = true
            }
        }

        if (this.isSprite) { // If this element is a sprite, use the Sprite.containsPoint()
            return this.sprite.containsPoint(mousePosition)
        }

        return answer
    }
}