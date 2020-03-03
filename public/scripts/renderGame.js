class RenderGame {
  renderGame() {
    var canvas = document.getElementById('canvas')
    var canvasContext = canvas.getContext('2d')
    // Create image objcects
    var dinoImage = new Image()
    dinoImage.src = 'images/dino_run.png'
    var backgroundImage = new Image()
    backgroundImage.src = 'images/background_desert.png'
    var stoneBlock = new Image()
    stoneBlock.src = 'images/stone_block.png'
    var groundCentreImage = new Image()
    var groundLeftImage = new Image()
    var groundRightImage = new Image()
    groundCentreImage.src = 'images/ground_centre.png'
    groundLeftImage.src = 'images/ground_left.png'
    groundRightImage.src = 'images/ground_right.png'
  }
}
