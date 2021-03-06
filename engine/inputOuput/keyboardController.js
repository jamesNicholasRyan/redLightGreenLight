// This file controls all of the KEYBOARD interactions with the engine

export default class KeyboardController {

    constructor() {

    }

    init() {
        this.arrowKeys()
        this.wAsD()
    }

    arrowKeys() {
        // checks wether a arrow key has been pressed

        document.addEventListener('keydown', onKeyDown)

        function onKeyDown(e) {
            const key = e.key
            if (key === 'ArrowRight') {
                gameEngine.arrowRight = true
            } else if (key === 'ArrowLeft') {
                gameEngine.arrowLeft = true
            } else if (key === 'ArrowUp') {
                gameEngine.arrowUp = true
            } else if (key === 'ArrowDown') {
                gameEngine.arrowDown = true
            }
        }

        document.addEventListener('keyup', onKeyUp, false)

        function onKeyUp(e) {
            const key = e.key
            if (key === 'ArrowRight') {
                gameEngine.arrowRight = false
            } else if (key === 'ArrowLeft') {
                gameEngine.arrowLeft = false
            } else if (key === 'ArrowUp') {
                gameEngine.arrowUp = false
            } else if (key === 'ArrowDown') {
                gameEngine.arrowDown = false
            }
        }
    }

    wAsD() {
        // checks wether either of the W, A, S, D keys have been pressed
        document.addEventListener('keydown', onKeyDown)

        function onKeyDown(e) {
            e.preventDefault()
            const keyCode = e.keyCode
            if (keyCode === 68) {             // d
                window.gameEngine.keyD = true
            } else if (keyCode === 65) {      // a
                window.gameEngine.keyA = true
            } else if (keyCode === 87) {      // w
                window.gameEngine.keyW = true
            } else if (keyCode === 83) {      // s
                window.gameEngine.keyS = true
            } else if (keyCode === 32) {      // SPACEBAR
                window.gameEngine.spaceBar = true
            }   
        }

        document.addEventListener('keyup', onKeyUp, false)

        function onKeyUp(e) {
            const keyCode = e.keyCode
            if (keyCode === 68) {             // d
                window.gameEngine.keyD = false
            } else if (keyCode === 65) {      // a
                window.gameEngine.keyA = false
            } else if (keyCode === 87) {      // w
                window.gameEngine.keyW = false
            } else if (keyCode === 83) {      // s
                window.gameEngine.keyS = false
            } else if (keyCode === 32) {      // SPACEBAR
                window.gameEngine.spaceBar = false
            }   
        }

    }



}


function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 68: //d
        keyD = true;
        break;
      case 83: //s
        keyS = true;
        break;
      case 65: //a
        keyA = true;
        break;
      case 87: //w
        keyW = true;
        break;
    }
  }
  
  function onKeyUp(event) {
    var keyCode = event.keyCode;
  
    switch (keyCode) {
      case 68: //d
        keyD = false;
        break;
      case 83: //s
        keyS = false;
        break;
      case 65: //a
        keyA = false;
        break;
      case 87: //w
        keyW = false;
        break;
    }
  }
