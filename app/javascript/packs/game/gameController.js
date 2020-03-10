// Import dependencies
import Score from './score.js'
import Ground from './ground.js'
import Dino from './dino.js'
import Block from './block.js'
import Background from './background.js'
import RenderGame from './renderGame.js'
import loadGameImages from './loadImages.js'
import { toggleLogInForm } from '../homepage_interface/userInterface.js'

class GameController {
  async setupGame() {
    this.canvas = document.getElementById('canvas')
    var loadedImages = await loadGameImages()
    this.game = new RenderGame(canvas, loadedImages, Background, Ground, Dino, Block, Score, this)
    this.game.setup()
  }

  startGame(data, audioElement) {
    this.game.startGame(data["bpm"], 1.5) //bpm, difficulty(blocks on screen, lower = faster and fewer)
    setTimeout(function() {
      audioElement.play()
    }, 5000)
    self = this
    document.body.onkeyup = function(e){
      if(e.keyCode == 32){
        self.game.dino.jump()
      }
    }
  }

  gameComplete(score) {
    // Ajax score to leaderboard database
    // Display navbar
    // Play theme tune
    console.log(score)
    console.log('game over in controller')
    document.querySelector('#logged-in').style.display = 'block'
  }
}

export default GameController
