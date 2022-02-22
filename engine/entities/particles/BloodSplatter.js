// This file contains all the logic to create the blood particle systems animation

import randomNumGen from "../../utils/randomNumberGen"
import Vector from "../../utils/vector"
import BloodParticle from "./BloodParticle"

export default class BloodSplatter {
    constructor(x, y, numOfParticles) {
        this.ratio = window.world.ratio
        this.locationX = x
        this.locationY = y
        this.numOfParticles = numOfParticles
        this.colorArray = [0xB22222, 0x8B0000, 0x8B0000, 0xDC143C,]
        this.initAccelUp = 7 *this.ratio
        this.initAccel = 5 *this.ratio
    }

    init() {
        for (let i=0; i<this.numOfParticles; i++) {
            const randomNumX = randomNumGen(-this.initAccelUp, this.initAccelUp)
            const randomNumY = randomNumGen(-this.initAccelUp, this.initAccel)
            const randomRadius = randomNumGen(0.1, 2)  *this.ratio
            const randNum = Math.round(randomNumGen(0, 3))
            const initAcceleration = new Vector(randomNumX, randomNumY)
            const bloodParticle = new BloodParticle(this.locationX,
                                                    this.locationY,
                                                    initAcceleration,
                                                    50, 100, randomRadius, this.colorArray[randNum])
            gameEngine.createGameObject(bloodParticle, window.world.gameObjectStr)
            
        }
    }
}