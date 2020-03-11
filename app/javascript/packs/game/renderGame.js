class RenderGame {
  constructor(canvas, loadedImages, backgroundClass, groundClass, dinoClass, blockClass, scoreClass, gameController, crateClass, fireEffectClass) {
    this.canvas = canvas
    this.loadedImages = loadedImages
    this.canvasContext = this.canvas.getContext('2d')
    this.backgroundClass = backgroundClass
    this.groundClass = groundClass
    this.dinoClass = dinoClass
    this.blockClass = blockClass
    this.scoreClass = scoreClass
    this.fireEffectClass = fireEffectClass
    this.groundLevel = 100
    this.frameInterval = 20
    this.fps = 50
    this.gameController = gameController
    this.crateClass = crateClass
  }

  //=================================================================================
  //                           Setup Game
  //=================================================================================

  setup() {
    this.frameCounter = 0
    this.gameOver = false
    this.dinoOffScreen = false
    this.blocksArray = []
    this.cratesArray = []
    this._drawBackground()
    this._drawGround()
    this._drawDino()
    this.newScore = new this.scoreClass()
    this._drawScore(0)
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

  _drawScore(score) {
    if (this.gameOver == false) {
      this.newScore.updateScore(score)
    }
    this.canvasContext.font = "30px Arial"
    this.canvasContext.strokeText(`${this.newScore.currentScore}`, this.canvas.width - 200, 50)
  }

  _drawDino() {
    let newDino = new this.dinoClass(this.loadedImages['dinoRunImageArray'], this.loadedImages['dinoDeadImageArray'], this.loadedImages['dinoJumpImageArray'])
    this.canvasContext.drawImage(newDino.returnCurrentImage(), newDino.x, newDino.y, newDino.xSize, newDino.ySize)
    this._initializeFire(newDino)
    this.dino = newDino
  }

  _initializeFire(dino) {
    this.fireEffect = new this.fireEffectClass(this.loadedImages['fireEffectImageArray'], dino)
  }

  //=================================================================================
  //                           Animate Game
  //=================================================================================

  startGame(bpm, difficulty, generatedMapArray) { //frequencyArray,
    this.mapArray = generatedMapArray
    this.generatedBlockArray = [...generatedMapArray]
    this.generatedGroundArray = [...generatedMapArray]
    this.generatedCrateArray = [...generatedMapArray]
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
        self.mapNewItems()
        self.timeStepBackground()
        self.timeStepGround()
        self.timeStepBlocks()
        self.timeStepCrates()
        self.timeStepFireEffect()
        self.timeStepDino()
        self._drawScore(100)
        self.deathInteractionGround()
        if (self.gameOver == true) {
          clearInterval(gameInterval)
          self.animateDeath()
          self.gameController.playDeathSound()
        }
      })
    }, self.frameInterval)
  }

  _drawTopThree(data) {
    this.canvasContext.textAlign = 'left'
    this.canvasContext.font = '20px serif'
    var lineHeight = 320
    this.canvasContext.fillText('High scores:', 510, lineHeight)
    self = this
    data.forEach( function(user) {
      lineHeight += 20
      self.canvasContext.fillText(user['username'] + ' ' + user['score'], 520, lineHeight)
    })
  }

  _drawGameOverScreen(finalScore) {
    this.canvasContext.drawImage(this.loadedImages['endSignImage'], 270, 0)
    this.canvasContext.textAlign = 'center'
    this.canvasContext.font = '40px serif'
    this.canvasContext.fillStyle = 'black'
    this.canvasContext.fillText(`Your Final Score: ${finalScore}`, 640, 290)
    this.canvasContext.drawImage(this.loadedImages['replayImage'], 680, 300, 100, 100)
    var self = this
    var resetGame = function(event) {
      if ( event.x > 720 && event.x < 800 && event.y > 360 && event.y < 440) {
        self.setup()
        self.canvas.removeEventListener('click', resetGame)
        document.querySelector('#logged-in').style.display = 'block'
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
          var newVelocity = Math.floor(self.objectVelocity - velocityDeducter)
          if (newVelocity > 0){
            self.objectVelocity = newVelocity
          } else {
            self.objectVelocity = 0
          }
        }
        self.timeStepBackground()
        self.timeStepGround()
        self.timeStepBlocks()
        self.timeStepCrates()
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

  // =========================
  // Map new items
  // =========================

  mapNewItems() {
    let adjustedFrame = this.frameCounter - 150
    if ((adjustedFrame >= 0) && (adjustedFrame % this.fpb == 0)) { //always start with first block on inital 150th frame
      let mapIndex = adjustedFrame / this.fpb
      let newItemValue = this.mapArray[mapIndex]
      if (newItemValue == 1) {
        this.blocksArray.push( new this.blockClass(this.canvas, this.loadedImages['stoneBlockImage']) )
      } 
      else if (newItemValue == 2) {
        this.groundArray = this.groundArray.concat(this._createGroundFeature())
      }
      else if (newItemValue == 3) {
        this.cratesArray.push( new this.crateClass(this.canvas, this.loadedImages['crateImageArray']) )
      }
    }
  }
  
  // =========================
  // Dino
  // =========================

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
    this.canvasContext.drawImage(this.dino.returnCurrentImage(), this.dino.x, this.dino.y + 10, this.dino.xSize, this.dino.ySize);
  }

  timeStepDeadDino(counter) {
    if (this.dinoOffScreen == true) {
      var dinoXLoc = this.dino.y
    } else {
      var dinoXLoc = this.canvas.height - 230
    }
    this.canvasContext.drawImage(this.dino.imageDead(counter), this.dino.x, dinoXLoc, this.dino.xSize, this.dino.ySize);
  }

  // =========================
  // Ground
  // =========================

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

  deathInteractionGround() {
    if (this.dino.y >= this.canvas.height) {
      this.gameOver = true
      this.dinoOffScreen = true
    }
  }

  _createGroundFeature() {
    var lastGroundItem = this.groundArray[this.groundArray.length - 1]
    var lastGroundXLoc = lastGroundItem.x + lastGroundItem.xSize
    var leftGroundFeatureBlock = new this.groundClass(this.canvas, this.loadedImages['groundImageArray'][2])
    var rightGroundFeatureBlock = new this.groundClass(this.canvas, this.loadedImages['groundImageArray'][0])
    leftGroundFeatureBlock.x = lastGroundXLoc
    rightGroundFeatureBlock.x = lastGroundXLoc + leftGroundFeatureBlock.xSize + 250
    return [leftGroundFeatureBlock, rightGroundFeatureBlock]
  }

  // =========================
  // Blocks 
  // =========================

  timeStepBlocks() {
    for (var i = 0; i < this.blocksArray.length; i++) {
      this.canvasContext.drawImage(this.blocksArray[i].image, this.blocksArray[i].x, this.blocksArray[i].y, this.blocksArray[i].xSize, this.blocksArray[i].ySize)
      if (this.deathInteractionBlock(i)) {
        this.gameOver = true
      }
      this.blocksArray[i].move(this.objectVelocity)
    }
    if (this.blocksArray.length > 0) {
      if (this.blocksArray[0].x <= -this.blocksArray[0].xSize) {
        this.blocksArray.shift()
        this.newScore.jumpScore()
      }
    }
  }

  deathInteractionBlock(i) {
    let dinoCentre = this.dino.objectCentre()
    let blockCentre = this.blocksArray[i].objectCentre()
    let circlesDifference = Math.sqrt(((dinoCentre[0] - blockCentre[0])**2) + ((dinoCentre[1] - blockCentre[1])**2))
    let radiusSum = this.dino.objectRadius() + this.blocksArray[i].objectRadius()
    return circlesDifference < radiusSum
  }

  // =========================
  // Crates 
  // =========================

  timeStepCrates() {
    for (var i = 0; i < this.cratesArray.length; i++) {
      this.canvasContext.drawImage(this.cratesArray[i].returnImage(), this.cratesArray[i].x, this.cratesArray[i].y, this.cratesArray[i].xSize, this.cratesArray[i].ySize)
      if (this.deathInteractionCrate(i) && this.cratesArray[i].exploded == false) {
        this.gameOver = true
      }
      this.cratesArray[i].move(this.objectVelocity)
    }
    // delete crates when off canvas
    if (this.cratesArray.length > 0) {
      if (this.cratesArray[0].x <= -this.cratesArray[0].xSize) {
        this.cratesArray.shift()
      }
    }
  }

  deathInteractionCrate(i) {
    let dinoCentre = this.dino.objectCentre()
    let crateCentre = this.cratesArray[i].objectCentre()
    let circlesDifference = Math.sqrt(((dinoCentre[0] - crateCentre[0])**2) + ((dinoCentre[1] - crateCentre[1])**2))
    let radiusSum = this.dino.objectRadius() + this.cratesArray[i].objectRadius()
    return circlesDifference < radiusSum
  }

  // =========================
  // Fire Effect/Attack
  // =========================

  timeStepFireEffect() {
    if (this.fireEffect.animationCounter > 0) {
      this.fireEffect.fireEffectSound.play()
      let fireEffectLocationHash = this.fireEffect.fireLocation(this.dino)
      this.fireEffect.killCrates(this.cratesArray, fireEffectLocationHash, this.newScore)
      this.canvasContext.drawImage(this.fireEffect.returnImage(), fireEffectLocationHash['xLoc'], fireEffectLocationHash['yLoc'], fireEffectLocationHash['xSize'], fireEffectLocationHash['ySize'])
    }
  }

  crateAttack() {
    if (this.fireEffect.animationCounter < 1) {
      this.fireEffect.activateFire()
    }
  }
}

export default RenderGame
