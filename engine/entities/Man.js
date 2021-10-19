import * as PIXI from 'pixi.js'
import Vector from '../utils/vector'
import GameObject from './GameObject'


export default class Man extends GameObject {

    constructor(x, y, a, b) {
        super(x, y, a, b)
        this.speed = 0.25
    }

    update(){
        if (window.gameEngine.keyW) {
            this.applyForce(new Vector(0,-this.speed))
        } else if (window.gameEngine.keyA) {
            this.applyForce(new Vector(-this.speed,0))
        } else if (window.gameEngine.keyS) {
            this.applyForce(new Vector(0,this.speed))
        } else if (window.gameEngine.keyD) {
            this.applyForce(new Vector(this.speed,0))
        }
        super.update()
    }
}