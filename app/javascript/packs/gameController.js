window.addEventListener('load', function(){
  var canvas;
  var game;
  
  var canvas = document.getElementById('canvas')

  game = new window.RenderGame(canvas, window.Background, window.Ground, window.Dino, window.Block)
  game.setup()

  document.body.onkeyup = function(e){
    if(e.keyCode == 32){
      game.dino.jump()
    }
  }

  document.getElementById('start_game_btn').addEventListener('click', function() {
    game.startGame(5, 1)
  })

})