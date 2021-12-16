import randomNumGen from "../../utils/randomNumberGen"
import GameObject from "../GameObject"

export default class Blood extends GameObject  {
    constructor(x, y) {
        super(x, y)
        this.radius = 1
        this.life = 15
        this.bloodSpeed = 1
    }

    createDisplay() {
        this.display()
        return this.graphics
    }

    display() {
        this.graphics.lineStyle(10, 0x8B0000, 1*(this.life/10))
        const randomX = randomNumGen(this.location.x-5, this.location.x+5)
        const randomY = randomNumGen(this.location.y-5, this.location.y+5)
        this.graphics.drawEllipse(this.location.x, this.location.y, this.radius, this.radius*1.9)
        this.graphics.endFill()

        this.graphics.lineStyle(5, 0x8B0000, 1*(this.life/10))
        const randomX2 = randomNumGen(this.location.x, this.location.x+10)
        const randomY2 = randomNumGen(this.location.y-10, this.location.y)
        this.graphics.drawCircle(randomX2, randomY2, this.radius*0.5)
        this.graphics.endFill()

        this.graphics.lineStyle(5, 0xB22222, 1*(this.life/10))
        const randomX3 = randomNumGen(this.location.x-10, this.location.x)
        const randomY3 = randomNumGen(this.location.y, this.location.y+10)
        this.graphics.drawCircle(randomX3, randomY3, this.radius*0.5)
        this.graphics.endFill()

        this.graphics.lineStyle(5, 0xDC143C, 1*(this.life/10))
        const randomX4 = randomNumGen(this.location.x-10, this.location.x)
        const randomY4 = randomNumGen(this.location.y-10, this.location.y)
        this.graphics.drawCircle(randomX4, randomY4, this.radius*0.5)
        this.graphics.endFill()
    }

    update() {
        this.life --
        this.radius += this.bloodSpeed
    }

    garbageCollection() {
        // If this life is < 0, return false
        return this.life <= 0
    }
}