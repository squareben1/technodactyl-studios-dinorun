
class RenderGame {
  constructor(canvas, backgroundClass, groundClass, dinoClass, blockClass) {
    this.canvas = canvas
    this.canvasContext = this.canvas.getContext('2d')
    this.backgroundClass = backgroundClass
    this.groundClass = groundClass
    this.dinoClass = dinoClass
    this.blockClass = blockClass
    this.groundLevel = 100
    this.fps = 1000/59.94
  }

  setup() {
    this.frameCounter = 0
    this.blocksArray = []
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
      this.canvasContext.drawImage(this.backgroundArray[i].image, this.backgroundArray[i].x, this.backgroundArray[i].y, this.backgroundArray[i].xSize, this.backgroundArray[i].ySize)
    }
  }

  _drawGround() {
    let newGround = new this.groundClass(this.canvas, this.groundLeftImage)
    this.groundArray.push(newGround)
    this.canvasContext.drawImage(newGround.image, newGround.x, newGround.y, newGround.x, newGround.y)
  }

  _drawDino() {
    let newDino = new this.dinoClass(this.dinoImage)
    this.canvasContext.drawImage(newDino.image, newDino.x, newDino.y, newDino.xSize, newDino.ySize)
    this.dino = newDino
  }

  _generateImages() {
    self = this
    var imageCounter = 0
    var numberOfImages = 5

    this.backgroundImage = new Image()
    this.dinoImage = new Image()
    this.groundCentreImage = new Image()
    this.groundLeftImage = new Image()
    this.stoneBlockImage = new Image()

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
    this.stoneBlockImage.onload = onLoadCallback

    // Create image objects
    this.dinoImage.src = 'images/dino_png/Run (2).png'
    this.backgroundImage.src = 'images/bg.png'
    this.groundCentreImage.src = 'images/deserttileset/png/Tile/2.png'
    this.groundLeftImage.src = 'images/deserttileset/png/Tile/1.png'
    this.stoneBlockImage.src = 'images/deserttileset/png/Objects/StoneBlock.png'
    // this.groundCentreImage = new Image()
    // this.groundCentreImage.src = 'images/deserttileset/png/2.png'
    // this.groundLeftImage = new Image()
    // this.groundLeftImage.src = 'images/deserttileset/png/1.png'
    // this.groundRightImage = new Image()
    // this.groundRightImage.src = 'images/deserttileset/png/3.png'
  }

  startGame(bpm, difficulty) { //frequencyArray, 
    this.blockGeneratorArray = [1,1,1,1,1,1,0,0,1,1,0,1,0,1,0,1,0,0,0,1,1,0,1,0,0,1,1,1,1,1]
    this._generateFramesPerBeat(bpm)
    this._calculateObjectVelocity(difficulty)
    this.animateGame()
  }

  _generateFramesPerBeat(bpm) {
    this.fpb = Math.round(this.fps / (bpm / 60))
    console.log('bpm')
    console.log(bpm)
    console.log('fpb')
    console.log(this.fpb)
    console.log('fps')
    console.log(this.fps)
  }

  _calculateObjectVelocity(difficulty) {
    this.objectVelocity = Math.ceil((((this.canvas.width - this.dino.x - this.dino.xSize) / difficulty) / this.fpb)/5) *5
    console.log('objectVelocity')
    console.log(this.objectVelocity)
  }

  animateGame() {
    self = this
    var animationFrameHandle
    var gameInterval = setInterval(function() {
      cancelAnimationFrame(animationFrameHandle)
      animationFrameHandle = requestAnimationFrame(function() {
        self.frameCounter++
        self.timeStepBackground()
        self.timeStepGround()
        self.timeStepDino()
        self.timeStepBlocks()
      })
    }, self.fps)
  }

  timeStepBackground() {
    for (var i = 0; i < this.backgroundArray.length; i++) {
      if (this.backgroundArray[i].x == -this.canvas.width + (this.objectVelocity / 2)) {
        this.backgroundArray[i].reset()
      }
      else {
        this.backgroundArray[i].move(this.objectVelocity)
      }
      this.canvasContext.drawImage(this.backgroundArray[i].image, this.backgroundArray[i].x, this.backgroundArray[i].y, this.backgroundArray[i].xSize, this.backgroundArray[i].ySize)
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
        this.groundArray[i].move(this.objectVelocity)
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
    this.canvasContext.drawImage(this.dino.image, this.dino.x, this.dino.y, this.dino.xSize, this.dino.ySize)
  }

  timeStepBlocks() {
    if (this.frameCounter >= 300 && (this.frameCounter - 300 + this.fpb) % this.fpb == 0) { //always start with first block on inital 300th frame
      let newBlockValue = this.blockGeneratorArray.shift()
      if (newBlockValue == 1) {
        console.log('newblock')
        this.blocksArray.push(new this.blockClass(this.canvas, this.stoneBlockImage))
      }
    }
    for (var i = 0; i < this.blocksArray.length; i++) {
      this.canvasContext.drawImage(this.blocksArray[i].image, this.blocksArray[i].x, this.blocksArray[i].y, this.blocksArray[i].xSize, this.blocksArray[i].ySize)
      this.blocksArray[i].move(this.objectVelocity)
    }
  }
}
window.RenderGame = RenderGame