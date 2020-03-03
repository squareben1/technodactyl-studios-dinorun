// Load Page => new game
window.addEventListener('load', function(){
  var canvas = document.getElementById('canvas')

  game = new RenderGame(canvas)
  game.setup()
})