// This file contains all the logic to create the blood particle systems animation

import randomNumGen from "../../utils/randomNumberGen"
import Vector from "../../utils/vector"
import BloodParticle from "./BloodParticle"

export default class BloodSplatter {
    constructor(x, y, numOfParticles) {
        this.locationX = x
        this.locationY = y
        this.numOfParticles = numOfParticles
        this.colorArray = [0xB22222, 0x8B0000, 0x8B0000, 0xDC143C,]
    }

    init() {
        for (let i=0; i<this.numOfParticles; i++) {
            const randomNumX = randomNumGen(-3, 3)
            const randomNumY = randomNumGen(-3, 3)
            const randomRadius = randomNumGen(0.1, 2)
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