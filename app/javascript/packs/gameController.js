class GameController {
  setupGame() {
    this.canvas = document.getElementById('canvas')
    this.game = new window.RenderGame(canvas, window.Background, window.Ground, window.Dino, window.Block, this)
    this.game.setup()
  }

  startGame(data, audioElement) {
    this.game.startGame(parseInt(data['bpm']), 2) //bpm, difficulty(blocks on screen, lower = faster and fewer)
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

window.GameController = GameController
