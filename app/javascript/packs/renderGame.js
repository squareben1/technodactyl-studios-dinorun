
class RenderGame {
  constructor(canvas, backgroundClass, groundClass) {
    this.canvas = canvas
    this.canvasContext = this.canvas.getContext('2d')
    this.backgroundClass = backgroundClass
    this.groundClass = groundClass
    this.groundLevel = 100
  }

  setup() {
    this._generateImages()
    this.blockArray = []
    this.backgroundArray = []
    this._drawNewBackground()
    this.groundArray = []
    this._drawGround()
  }

  _drawNewBackground() {
    this.backgroundImage = new Image()

    self = this
    
    this.backgroundImage.onload = function() {
      self.backgroundArray = []
      self.backgroundArray.push(new self.backgroundClass(self.canvas, self.backgroundImage))
      var secondBackground = new self.backgroundClass(self.canvas, self.backgroundImage)
      secondBackground.reset()
      self.backgroundArray.push(secondBackground)
      // Draw background
      for (var i = 0; i < self.backgroundArray.length; i++) {
        self.canvasContext.drawImage(self.backgroundArray[i].image, self.backgroundArray[i].x, self.backgroundArray[i].y, self.canvas.width, self.canvas.height)
      }
    }

    this.backgroundImage.src = 'images/bg.png'
    
  }

  _drawGround() {
    this.groundCentreImage = new Image()
    self = this
    this.groundCentreImage.onload = function() {
      var numberBlocks = Math.ceil(self.canvas.width / 120)
      for (var i = 0; i < (numberBlocks); i++ ) {
        let newGround = new self.groundClass(self.canvas, self.groundCentreImage)
        newGround.x = i*120
        self.canvasContext.drawImage(newGround.image, newGround.x, newGround.y, 120, 120)
        self.groundArray.push(newGround)
      }
    }
    this.groundCentreImage.src = 'images/deserttileset/png/Tile/2.png'
  }

  _generateImages() {
    // Create image objects
    // this.dinoImage = new Image()
    // this.dinoImage.src = '/dino_png/Run (2).png'

    // this.stoneBlock = new Image()
    // this.stoneBlock.src = 'images/deserttileset/png/Objects/StoneBlock.png'
    // this.groundCentreImage = new Image()
    // this.groundCentreImage.src = 'images/deserttileset/png/2.png'
    // this.groundLeftImage = new Image()
    // this.groundLeftImage.src = 'images/deserttileset/png/1.png'
    // this.groundRightImage = new Image()
    // this.groundRightImage.src = 'images/deserttileset/png/3.png'
  }
}
window.RenderGame = RenderGame