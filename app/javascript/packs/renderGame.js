
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
    let newGround = new this.groundClass(this.canvas, this.groundLeftImage)
    this.groundArray.push(newGround)
    this.canvasContext.drawImage(newGround.image, newGround.x, newGround.y, 120, 120)
  }

  _drawDino() {
    let newDino = new this.dinoClass(this.dinoImage)
    this.canvasContext.drawImage(newDino.image, newDino.x, newDino.y, 120, 120)
    this.dino = newDino
  }

  _generateImages() {
    self = this
    var imageCounter = 0
    var numberOfImages = 4

    this.backgroundImage = new Image()
    this.dinoImage = new Image()
    this.groundCentreImage = new Image()
    this.groundLeftImage = new Image()

    var onLoadCallback = function() {
      imageCounter++;
      if (imageCounter == numberOfImages) {
        self._drawNewBackground()
        self._drawGround()
        self._drawDino()
      }
    }

    this.dinoImage.onload = onLoadCallback
    this.backgroundImage.onload = onLoadCallback
    this.groundCentreImage.onload = onLoadCallback
    this.groundLeftImage.onload = onLoadCallback

    // Create image objects
    this.dinoImage.src = 'images/dino_png/Run (2).png'
    this.backgroundImage.src = 'images/bg.png'
    this.groundLeftImage.src = 'images/deserttileset/png/Tile/1.png'
    this.groundCentreImage.src = 'images/deserttileset/png/Tile/2.png'
    // this.stoneBlock = new Image()
    // this.stoneBlock.src = 'images/deserttileset/png/Objects/StoneBlock.png'
    // this.groundCentreImage = new Image()
    // this.groundCentreImage.src = 'images/deserttileset/png/2.png'
    // this.groundLeftImage = new Image()
    // this.groundLeftImage.src = 'images/deserttileset/png/1.png'
    // this.groundRightImage = new Image()
    // this.groundRightImage.src = 'images/deserttileset/png/3.png'
  }

  startGame() {
    self = this
    var animationFrameHandle
    var gameInterval = setInterval(function() {
      cancelAnimationFrame(animationFrameHandle)
      animationFrameHandle = requestAnimationFrame(function() {
        self.timeStepBackground()
        self.timeStepGround()
        self.timeStepDino()
      })
    }, 16)
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

  timeStepGround() {
    for (var i = 0; i < this.groundArray.length; i++) {
      this.canvasContext.drawImage(this.groundArray[i].image, this.groundArray[i].x, this.groundArray[i].y, 120, 120)
      if ((i == this.groundArray.length - 1) && (this.groundArray[i].x <= this.canvas.width - 120)) {
        this.groundArray.push(new this.groundClass(this.canvas, this.groundCentreImage))
      }
      if (this.groundArray[i].x <= -240) {
        this.groundArray.splice(i, 1)
      }
      else {
        this.groundArray[i].move()
      }
    }
  }

  timeStepDino() {
    if (this.groundArray[0].x <= 300) {
      let filteredGround = this.groundArray.filter(function(item) {
          return item.x >= -20 && item.x <= 220
      })
      if (filteredGround.length > 0 && (this.dino.y <= this.canvas.height - 240 && this.dino.y >= this.canvas.height - 259)) {
        this.dino.resetJump()
        this.dino.y = this.canvas.height - 240
      }
      else {
        this.dino.applyGravity()
      }
      this.dino.applyJump()
    }
    this.canvasContext.drawImage(this.dino.image, this.dino.x, this.dino.y, 120, 120)
  }
}
window.RenderGame = RenderGame