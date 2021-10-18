import * as PIXI from 'pixi.js'
import KeyboardController from '../inputOuput/keyboardController'
import Vector from '../utils/vector'
import GameObject from './GameObject'


export default class Man extends GameObject {

    constructor(x, y, a, b, v1, v2) {
        super(x, y, a, b, v1, v2)
    }

    update(){
        if (KeyboardController.keyW) {
            this.applyForce(0,-5)
        } else if (KeyboardController.keyA) {
            this.applyForce(-5,0)
        } else if (KeyboardController.keyS) {
            this.applyForce(0,5)
        } else if (KeyboardController.keyD) {
            this.applyForce(5,0)
        }
        super.update()
    }
}