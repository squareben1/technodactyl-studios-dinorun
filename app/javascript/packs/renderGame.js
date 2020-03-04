
class RenderGame {
  constructor(canvas, backgroundClass, groundClass, dinoClass) {
    this.canvas = canvas
    this.canvasContext = this.canvas.getContext('2d')
    this.backgroundClass = backgroundClass
    this.groundClass = groundClass
    this.dinoClass = dinoClass
    this.groundLevel = 100
  }

  setup() {
    this.blockArray = []
    this.backgroundArray = []
    this.groundArray = []
    this._generateImages()
  }

  _drawNewBackground() {
    this.backgroundArray.push(new this.backgroundClass(this.canvas, this.backgroundImage))
    var secondBackground = new this.backgroundClass(this.canvas, this.backgroundImage)
    secondBackground.reset()
    this.backgroundArray.push(secondBackground)
    // Draw background
    for (var i = 0; i < this.backgroundArray.length; i++) {
      this.canvasContext.drawImage(this.backgroundArray[i].image, this.backgroundArray[i].x, this.backgroundArray[i].y, this.canvas.width, this.canvas.height)
    }
  }

  _drawGround() {
    var numberBlocks = Math.ceil(this.canvas.width / 120)
    for (var i = 0; i < (numberBlocks); i++ ) {
      let newGround = new this.groundClass(this.canvas, this.groundCentreImage)
      newGround.x = i*120
      this.canvasContext.drawImage(newGround.image, newGround.x, newGround.y, 120, 120)
      this.groundArray.push(newGround)
    }
  }

  _drawDino() {
    let newDino = new this.dinoClass(this.dinoImage)
    this.canvasContext.drawImage(newDino.image, newDino.x, newDino.y, 120, 120)
    this.dino = newDino
  }

  _generateImages() {
    self = this
    var imageCounter = 0
    var numberOfImages = 3

    this.dinoImage = new Image()
    this.groundCentreImage = new Image()
    this.backgroundImage = new Image()

    var onLoadCallback = function() {
      imageCounter++;
      if (imageCounter == numberOfImages) {
        self._drawNewBackground()
        self._drawGround()
        self._drawDino()
      }
    }

    this.dinoImage.onload = onLoadCallback
    this.groundCentreImage.onload = onLoadCallback
    this.backgroundImage.onload = onLoadCallback

    // Create image objects
    this.dinoImage.src = 'images/dino_png/Run (2).png'
    this.groundCentreImage.src = 'images/deserttileset/png/Tile/2.png'
    this.backgroundImage.src = 'images/bg.png'
    // this.stoneBlock = new Image()
    // this.stoneBlock.src = 'images/deserttileset/png/Objects/StoneBlock.png'
    // this.groundCentreImage = new Image()
    // this.groundCentreImage.src = 'images/deserttileset/png/2.png'
    // this.groundLeftImage = new Image()
    // this.groundLeftImage.src = 'images/deserttileset/png/1.png'
    // this.groundRightImage = new Image()
    // this.groundRightImage.src = 'images/deserttileset/png/3.png'
  }

  playGame() {

  }

  timeStepBackground() {
    for (var i = 0; i < this.backgroundArray.length; i++) {
      if (this.backgroundArray[i].x == -this.canvas.width + 2.5) {
        this.backgroundArray[i].reset()
      }
      else {
        this.backgroundArray[i].move()
      }
      this.canvasContext.drawImage(this.backgroundArray[i].image, this.backgroundArray[i].x, this.backgroundArray[i].y, 1280, 720)
    }
  }
}
window.RenderGame = RenderGame