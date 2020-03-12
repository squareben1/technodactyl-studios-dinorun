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
    this.groundLevel = this.canvas.height / 7.2
    this.frameInterval = 10
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
    this._drawScore()
  }

  _drawBackground() {
    this.backgroundArray = []
    let firstBackground = new this.backgroundClass(this.loadedImages['backgroundImage'], this.canvas)
    let secondBackground = new this.backgroundClass(this.loadedImages['backgroundImage'], this.canvas)
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

  _drawScore(score = 0) {
    if (this.gameOver == false) {
      this.newScore.updateScore(score)
    }
    var fontSize = Math.round(this.canvas.height/27)
    this.canvasContext.font = `${fontSize}px Caesar Dressing`
    this.canvasContext.strokeText(`${this.newScore.currentScore}`, this.canvas.width - (this.canvas.width * 0.1), this.canvas.height / 14.4)
  }

  _drawDino() {
    var imageInterval = 10
    var gravity = Math.round(this.canvas.height / 72)
    var newDino = new this.dinoClass(this.loadedImages['dinoRunImageArray'], this.loadedImages['dinoDeadImageArray'], this.loadedImages['dinoJumpImageArray'], this.canvas, imageInterval, gravity)
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

  startGame(bpm, itemsOnScreen, generatedMapArray) { //frequencyArray,
    var scaledItemsOnScreen = itemsOnScreen * (canvas.width / 1280)
    this.mapArray = generatedMapArray
    this._generateFramesPerBeat(bpm)
    this._calculateObjectVelocity(scaledItemsOnScreen)
    this.animateGame()
  }

  _generateFramesPerBeat(bpm) {
    let bps = bpm / 60
    this.fpb = (Math.round(this.fps / bps) / 2) * 2
  }

  _calculateObjectVelocity(itemsOnScreen) {
    let pixelsToDino = this.canvas.width - this.dino.x - this.dino.xSize
    this.objectVelocity = (Math.round((pixelsToDino / this.fpb) / itemsOnScreen) / 2) * 2
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
        if (self.gameController.audioElement.ended) {
          clearInterval(gameInterval)
          self.animateEnding()
        }
        if (self.gameOver == true) {
          clearInterval(gameInterval)
          self.animateEnding()
          self.gameController.playDeathSound()
        }
      })
    }, self.frameInterval)
  }

  _drawTopThree(data) {
    var fontSize = Math.round(this.canvas.height/36)
    this.canvasContext.textAlign = 'left'
    this.canvasContext.font = `${fontSize}px Caesar Dressing`
    var lineHeight = Math.round(this.canvas.height / 2.25)
    var lineWidth = Math.round(this.canvas.width / 2.46)
    this.canvasContext.fillText('High scores:', lineWidth, lineHeight)
    self = this
    data.forEach( function(user) {
      lineHeight += Math.round(self.canvas.height / 36)
      self.canvasContext.fillText(user['username'].substring(0, 10) + ' ' + user['score'], lineWidth, lineHeight)
    })
  }

  _drawGameOverScreen(finalScore) {
    var endSignX = Math.round(this.canvas.width/4.74)
    var pixelSize = Math.round(this.canvas.height / 18)
    this.canvasContext.drawImage(this.loadedImages['endSignImage'], endSignX, 0, Math.round(this.canvas.width/1.52), Math.round(this.canvas.height/1.65))
    this.canvasContext.textAlign = 'center'
    this.canvasContext.font = `${pixelSize}px Caesar Dressing`
    this.canvasContext.fillStyle = 'black'
    this.canvasContext.fillText(`Your Final Score: ${finalScore}`, Math.round(this.canvas.width/2), Math.round(this.canvas.height/2.5))
    var resetBtnX = Math.round((this.canvas.width*2.8)/5)
    var resetBtnY = Math.round(this.canvas.height/2.4)
    this.canvasContext.drawImage(this.loadedImages['replayImage'], resetBtnX, resetBtnY, this.groundLevel, this.groundLevel)
    var self = this
    this.resetGameClick = function(event) {
      if ( (event.x > resetBtnX) && (event.x < resetBtnX + (self.groundLevel*2)) && (event.y > resetBtnY) && (event.y < resetBtnY + (self.groundLevel*2))) {
        self.resetGame()
      }
    }
    document.addEventListener('click', this.resetGameClick)
  }

  resetGame() {
    self.setup()
    self.canvas.removeEventListener('click', self.resetGameClick)
    //  $("#navbar").toggle()
    document.querySelector('#logged-in').style.display = 'block'
  }

  _drawSign(image) {
    this.canvasContext.drawImage(this.loadedImages[image], Math.round(this.canvas.width/1.6), Math.round(this.canvas.height/1.6), Math.round(this.canvas.width/4.3), Math.round(this.canvas.height/2.6))
  }

  animateEnding() {
    var gameOverFrameCounter = 0
    var velocityDeducter = this.objectVelocity / 9
    var self = this;
    var animationFrameHandle;
    if (self.gameOver == false) { self.dino.jump() }
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
        self.gameOver ? self.timeStepDeadDino(gameOverFrameCounter) : self.timeStepDino()
        gameOverFrameCounter++;
        if (gameOverFrameCounter == 47 && self.gameOver == false) {
          clearInterval(gameOverInterval)
          self.gameController.gameComplete(self.newScore.currentScore)
          self._drawGameOverScreen(self.newScore.currentScore)
          self._drawSign('winSignImage')
          self.gameOver = true
        }
        if (gameOverFrameCounter == 79) {
          clearInterval(gameOverInterval)
          self.gameController.gameComplete(self.newScore.currentScore)
          self._drawGameOverScreen(self.newScore.currentScore)
          self._drawSign('loseSignImage') 
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
    if (this.groundArray[0].x <= Math.round(this.canvas.width / 4.27)) {
      var groundPastDino = this.dino.x - this.groundArray[0].xSize
      var groundBeforeDino = this.dino.x + this.groundArray[0].xSize
      let filteredGround = this.groundArray.filter(function(item) {
        return (item.x >= groundPastDino) && (item.x <= groundBeforeDino);
      });
      var dinoGroundLevelY = this.canvas.height - this.dino.ySize - this.groundArray[0].ySize
      var dinoGroundUpperLevelY = Math.round(dinoGroundLevelY / 1.04)
      if ((filteredGround.length > 0) && (this.dino.jumpCounter < 1) && (this.dino.y <= dinoGroundLevelY) && (this.dino.y >= dinoGroundUpperLevelY)) {
        this.dino.resetJump();
        this.dino.y = dinoGroundLevelY;
      }
      else {
        this.dino.applyGravity();
      }
      this.dino.applyJump();
    }
    this.canvasContext.drawImage(this.dino.returnCurrentImage(), this.dino.x, this.dino.y + Math.round(this.groundLevel/10), this.dino.xSize, this.dino.ySize);
  }

  timeStepDeadDino(counter) {
    if (this.dinoOffScreen == true) {
      var dinoXLoc = this.dino.y
    } else {
      var dinoGroundLevelY = Math.round(this.canvas.height - this.dino.ySize - this.groundArray[0].ySize + this.groundLevel/10)
      var dinoXLoc = dinoGroundLevelY
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
    rightGroundFeatureBlock.x = lastGroundXLoc + leftGroundFeatureBlock.xSize + Math.round(this.canvas.width/5)
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
