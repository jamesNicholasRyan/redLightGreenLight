import Man from "./Man"
import randomNumGen from "../utils/randomNumberGen"


export default class MenuMan extends Man {
    constructor(id, x, y, a, b, randVel) {
        super(id, x, y, a, b)
        this.randomForce =randVel
        this.topSpeed = randomNumGen(0.8, 2)
        this.animationWidth = 52  *this.ratio
        this.animationHeight = 72  *this.ratio
    }

    update() {
        this.applyForce(this.randomForce)
        this.move()
        this.animation.animationSpeed = this.animationSpeed()
        if (!this.animation.playing) {
            this.animation.textures = gameEngine.menuManSheet["east"]
            this.animation.play()
        }
    }

    move() {
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.topSpeed)
        this.location.add(this.velocity)
        this.acceleration.multiply(0)
    }

    loadSprites() {
        this.loader.add('sheet', spriteSheet)
        this.loader.add('headSheet', headSpriteSheet)
        this.loader.load(this.setupSpriteSheets())
    }

}