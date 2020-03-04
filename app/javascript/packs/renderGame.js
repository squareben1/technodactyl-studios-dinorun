
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
    
      // this._drawNewBackground()
      // this._drawGround()
      // this._drawDino()
    
    
  }

  _drawNewBackground() {
    self = this
    
    // this.backgroundImage.onload = function() {
      self.backgroundArray = []
      self.backgroundArray.push(new self.backgroundClass(self.canvas, self.backgroundImage))
      var secondBackground = new self.backgroundClass(self.canvas, self.backgroundImage)
      secondBackground.reset()
      self.backgroundArray.push(secondBackground)
      // Draw background
      for (var i = 0; i < self.backgroundArray.length; i++) {
        self.canvasContext.drawImage(self.backgroundArray[i].image, self.backgroundArray[i].x, self.backgroundArray[i].y, self.canvas.width, self.canvas.height)
      }
      
      // selfself._drawGround()
      
    // }

  }

  _drawGround() {
    self = this
    // this.groundCentreImage.onload = function() {
      var numberBlocks = Math.ceil(self.canvas.width / 120)
      for (var i = 0; i < (numberBlocks); i++ ) {
        let newGround = new self.groundClass(self.canvas, self.groundCentreImage)
        newGround.x = i*120
        self.canvasContext.drawImage(newGround.image, newGround.x, newGround.y, 120, 120)
        self.groundArray.push(newGround)
      }
    // }
  }

  _drawDino() {
    self = this

    // this.dinoImage.onload = function() {
      console.log("test")
      let newDino = new self.dinoClass(self.dinoImage)
      self.canvasContext.drawImage(newDino.image, newDino.x, newDino.y, 120, 120)
      self.dino = newDino
      
    // }
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
      console.log(imageCounter)
      if (imageCounter == numberOfImages) {
        console.log("all loaded")
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
}
window.RenderGame = RenderGame