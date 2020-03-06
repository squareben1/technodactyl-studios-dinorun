window.addEventListener('load', function(){

  class GameController {
    setupGame() {
      this.canvas = document.getElementById('canvas')
      this.game = new window.RenderGame(canvas, window.Background, window.Ground, window.Dino, window.Block, this)
      this.game.setup()
    }

    startGame() {
      this.game.startGame(60, 2) //bpm, difficulty(blocks on screen, lower = faster and fewer)
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

  var gameController = new GameController
  gameController.setupGame()

  document.getElementById('start_game_btn').addEventListener('click', function() {
    gameController.startGame()
  })

})