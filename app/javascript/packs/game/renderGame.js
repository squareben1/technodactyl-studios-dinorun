class RenderGame {
  constructor(canvas, loadedImages, backgroundClass, groundClass, dinoClass, blockClass, scoreClass, gameController) {
    this.canvas = canvas
    this.loadedImages = loadedImages
    this.canvasContext = this.canvas.getContext('2d')
    this.backgroundClass = backgroundClass
    this.groundClass = groundClass
    this.dinoClass = dinoClass
    this.blockClass = blockClass
    this.scoreClass = scoreClass
    this.groundLevel = 100
    this.fps = 59.94
    this.frameInterval = 1000/this.fps
    this.gameController = gameController
  }

  //=================================================================================
  //                           Setup Game
  //=================================================================================

  setup() {
    this.frameCounter = 0
    this.gameOver = false
    this.blocksArray = []
    this._drawBackground()
    this._drawGround()
    this._drawDino()
    this.newScore = new this.scoreClass()
    this._drawScore()
  }

  _drawBackground() {
    this.backgroundArray = []
    let firstBackground = new this.backgroundClass(this.loadedImages['backgroundImage'], this.canvas.width, this.canvas.height)
    let secondBackground = new this.backgroundClass(this.loadedImages['backgroundImage'], this.canvas.width, this.canvas.height)
    secondBackground.x = this.canvas.width
    this.backgroundArray.push(firstBackground, secondBackground)
    for (var i = 0; i < this.backgroundArray.length; i++) {
      this.canvasContext.drawImage(this.backgroundArray[i].image, this.backgroundArray[i].x, this.backgroundArray[i].y, this.backgroundArray[i].xSize, this.backgroundArray[i].ySize)
    }
  }

  _drawGround() {
    this.groundArray = []
    let newGround = new this.groundClass(this.canvas, this.loadedImages['groundImageArray'][0])
    this.groundArray.push(newGround)
    this.canvasContext.drawImage(newGround.image, newGround.x, newGround.y, newGround.x, newGround.y)
  }

  _drawScore() {
    this.newScore.updateScore(this.frameCounter)
    this.canvasContext.font = "30px Arial"
    this.canvasContext.strokeText(`${this.newScore.currentScore}`, this.canvas.width - 200, 50)
  }

  _drawDino() {
    let newDino = new this.dinoClass(this.loadedImages['dinoRunImageArray'], this.loadedImages['dinoDeadImageArray'], this.loadedImages['dinoJumpImageArray'])
    this.canvasContext.drawImage(newDino.returnCurrentImage(), newDino.x, newDino.y, newDino.xSize, newDino.ySize)
    this.dino = newDino
  }

  //=================================================================================
  //                           Animate Game
  //=================================================================================

  startGame(bpm, difficulty) { //frequencyArray,
    this.blockGeneratorArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    this._generateFramesPerBeat(bpm)
    this._calculateObjectVelocity(difficulty)
    this.animateGame()
  }

  _generateFramesPerBeat(bpm) {
    let bps = bpm / 60
    this.fpb = (Math.round(this.fps / bps) / 2) * 2
  }

  _calculateObjectVelocity(difficulty) {
    let pixelsToDino = this.canvas.width - this.dino.x - this.dino.xSize
    this.objectVelocity = (Math.round((pixelsToDino / this.fpb) / difficulty) / 2) * 2
  }

  animateGame() {
    var self = this;
    var animationFrameHandle;
    var gameInterval = setInterval(function() {
      cancelAnimationFrame(animationFrameHandle);
      animationFrameHandle = requestAnimationFrame(function() {
        self.frameCounter++
        self.timeStepBackground()
        self.timeStepGround()
        self.timeStepBlocks()
        self.timeStepDino()
        self._drawScore()
        if (self.gameOver == true) {
          clearInterval(gameInterval)
          self.animateDeath()
          self.gameController.playDeathSound()
        }
      })
    }, self.frameInterval)
  }

  _drawGameOverScreen(finalScore) {
    this.canvasContext.drawImage(this.loadedImages['endSignImage'], 270, 0)
    this.canvasContext.textAlign = 'center'
    this.canvasContext.font = '40px serif'
    this.canvasContext.fillStyle = 'black'
    this.canvasContext.fillText(`Your Final Score: ${finalScore}`, 640, 290)
    this.canvasContext.drawImage(this.loadedImages['replayImage'], 600, 300, 100, 100)
    var self = this
    var resetGame = function(event) {
      if ( event.x > 650 && event.x < 720 && event.y > 460 && event.y < 530) {
        self.setup()
        self.canvas.removeEventListener('click', resetGame)
      }
    }
    this.canvas.addEventListener('click', resetGame)
  }

  animateDeath() {
    var gameOverFrameCounter = 0
    var velocityDeducter = this.objectVelocity / 9
    var self = this;
    var animationFrameHandle;
    var gameOverInterval = setInterval(function() {
      cancelAnimationFrame(animationFrameHandle)
      animationFrameHandle = requestAnimationFrame(function() {
        if (gameOverFrameCounter % 10 == 0) {
          self.objectVelocity = Math.floor(self.objectVelocity - velocityDeducter)
        }
        self.timeStepBackground()
        self.timeStepGround()
        self.timeStepBlocks()
        self._drawScore()
        self.timeStepDeadDino(gameOverFrameCounter)
        gameOverFrameCounter++;
        if (gameOverFrameCounter == 79) {
          clearInterval(gameOverInterval)
          self.gameController.gameComplete(self.newScore)
          self._drawGameOverScreen(self.newScore.currentScore)
        }
      })
    }, self.frameInterval)
  }

  timeStepBackground() {
    for (var i = 0; i < this.backgroundArray.length; i++) {
      this.backgroundArray[i].move(this.objectVelocity)
      this.canvasContext.drawImage(this.backgroundArray[i].image, this.backgroundArray[i].x, this.backgroundArray[i].y, this.backgroundArray[i].xSize, this.backgroundArray[i].ySize)
    }
  }

  timeStepGround() {
    // Move array of blocks and draw
    for (var i = 0; i < this.groundArray.length; i++) {
      this.groundArray[i].move(this.objectVelocity)
      this.canvasContext.drawImage(this.groundArray[i].image, this.groundArray[i].x, this.groundArray[i].y, this.groundArray[i].xSize, this.groundArray[i].ySize);
    }
    // Delete first if off screen
    if (this.groundArray[0].x <= -this.groundArray[0].xSize) {
      this.groundArray.shift()
    }
    // Check for new ground
    let newGroundLoc = this.groundArray[(this.groundArray.length-1)].isNewGroundNeeded(this.objectVelocity)
    if (newGroundLoc) {
      let newGround = new this.groundClass(this.canvas, this.loadedImages['groundImageArray'][1])
      newGround.x = newGroundLoc
      this.groundArray.push(newGround)
    }
  }

  timeStepDino() {
    if (this.groundArray[0].x <= 300) {
      let filteredGround = this.groundArray.filter(function(item) {
        return item.x >= -20 && item.x <= 220;
      });
      if (filteredGround.length > 0 && this.dino.y <= this.canvas.height - 240 && this.dino.y >= this.canvas.height - 259 && this.dino.jumpCounter < 1) {
        this.dino.resetJump();
        this.dino.y = this.canvas.height - 240;
      }
      else {
        this.dino.applyGravity();
      }
      this.dino.applyJump();
    }
    this.canvasContext.drawImage(this.dino.imageRun(), this.dino.x, this.dino.y + 10, this.dino.xSize, this.dino.ySize);
  }

  timeStepBlocks() {
    if (this.frameCounter >= 300 && ((this.frameCounter - 300 + this.fpb) % this.fpb == 0)) { //always start with first block on inital 300th frame
      let newBlockValue = this.blockGeneratorArray.shift()
      if (newBlockValue == 1) {
        this.blocksArray.push(
          new this.blockClass(this.canvas, this.loadedImages['stoneBlockImage'])
        );
      }
    }
    for (var i = 0; i < this.blocksArray.length; i++) {
      this.canvasContext.drawImage(this.blocksArray[i].image, this.blocksArray[i].x, this.blocksArray[i].y, this.blocksArray[i].xSize, this.blocksArray[i].ySize)
      if (this.deathInteractionBlock(i)) {
        this.gameOver = true
      }
      this.blocksArray[i].move(this.objectVelocity)
    }
  }

  timeStepDeadDino(counter) {
    this.canvasContext.drawImage(this.dino.imageDead(counter), this.dino.x, this.canvas.height - 230, this.dino.xSize, this.dino.ySize); // remove dino.y
  }

  deathInteractionBlock(i) {
    let dinoCentre = this.dino.objectCentre()
    let blockCentre = this.blocksArray[i].objectCentre()
    let circlesDifference = Math.sqrt(((dinoCentre[0] - blockCentre[0])**2) + ((dinoCentre[1] - blockCentre[1])**2))
    let radiusSum = this.dino.objectRadius() + this.blocksArray[i].objectRadius()
    return circlesDifference < radiusSum
  }
}

export default RenderGame
