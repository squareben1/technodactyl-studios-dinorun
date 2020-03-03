class RenderGame {
  constructor(canvas, backgroundClass) {
    this.canvas = canvas
    this.canvasContext = this.canvas.getContext('2d')
    this.backgroundClass = backgroundClass
  }

  setup() {
    this._generateImages()
    this.groundArray = []
    this.blockArray = []
    this.backgroundArray = []
    this._drawNewBackground()
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