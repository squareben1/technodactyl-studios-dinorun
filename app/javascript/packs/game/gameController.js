// Import dependencies
import Score from './score.js'
import Ground from './ground.js'
import Dino from './dino.js'
import Block from './block.js'
import Background from './background.js'
import RenderGame from './renderGame.js'
import loadGameImages from './loadImages.js'

class GameController {
  async setupGame() {
    this.canvas = document.getElementById('canvas')
    var loadedImages = await loadGameImages()
    this.game = new RenderGame(canvas, loadedImages, Background, Ground, Dino, Block, Score, this)
    this.game.setup()
  }

  startGame(data, audioElement) {
    console.log(data)
    this.game.startGame(data['bpm'], 2) //bpm, difficulty(blocks on screen, lower = faster and fewer)
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

  gameComplete() {
    // Ajax score to leaderboard database
    // Display navbar
    // Play theme tune
    console.log('game over in controller')
  }
}

export default GameController
