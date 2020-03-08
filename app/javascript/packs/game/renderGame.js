class RenderGame {
  constructor(canvas, backgroundClass, groundClass, dinoClass, blockClass, scoreClass, gameController) {
    this.canvas = canvas
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
    this.frameCounter = 0;
    this.gameOver = false;
    this.blocksArray = [];
    this.backgroundArray = [];
    this.groundArray = [];
    this._generateImages();
  }

  _drawScore() {
    this.newScore = new this.scoreClass
    this.newScore.updateScore(this.frameCounter)
    this.canvasContext.font = "30px Arial";
    this.canvasContext.strokeText(`${this.newScore.currentScore}`, this.canvas.width - 200, 50);
  }

  _drawNewBackground() {
    this.backgroundArray.push(new this.backgroundClass(this.backgroundImage, this.canvas.width, this.canvas.height))
    var secondBackground = new this.backgroundClass(this.backgroundImage, this.canvas.width, this.canvas.height)
    secondBackground.x = this.canvas.width
    this.backgroundArray.push(secondBackground)
    // Draw background
    for (var i = 0; i < this.backgroundArray.length; i++) {
      this.canvasContext.drawImage(this.backgroundArray[i].image, this.backgroundArray[i].x, this.backgroundArray[i].y, this.backgroundArray[i].xSize, this.backgroundArray[i].ySize);
    }
  }

  _drawGround() {
    let newGround = new this.groundClass(this.canvas, this.groundLeftImage);
    this.groundArray.push(newGround);
    this.canvasContext.drawImage(newGround.image, newGround.x, newGround.y, newGround.x, newGround.y);
  }

  _createDinoRunImageArray() {
    return [
      this.dinoRunImage1,
      this.dinoRunImage2,
      this.dinoRunImage3,
      this.dinoRunImage4,
      this.dinoRunImage5,
      this.dinoRunImage6,
      this.dinoRunImage7,
      this.dinoRunImage8
    ]
  }

  _createDinoDeadImageArray() {
    return [
      this.dinoDeadImage1,
      this.dinoDeadImage2,
      this.dinoDeadImage3,
      this.dinoDeadImage4,
      this.dinoDeadImage5,
      this.dinoDeadImage6,
      this.dinoDeadImage7,
      this.dinoDeadImage8
    ]
  }

  _drawDino() {
    let newDino = new this.dinoClass(this._createDinoRunImageArray(), this._createDinoDeadImageArray());
    this.canvasContext.drawImage(newDino.imageRun(), newDino.x, newDino.y, newDino.xSize, newDino.ySize);
    this.dino = newDino;
  }

  _generateImages() {
    self = this;
    var imageCounter = 0;
    var numberOfImages = 20;

    this.backgroundImage = new Image();
    this.dinoRunImage1 = new Image();
    this.dinoRunImage2 = new Image();
    this.dinoRunImage3 = new Image();
    this.dinoRunImage4 = new Image();
    this.dinoRunImage5 = new Image();
    this.dinoRunImage6 = new Image();
    this.dinoRunImage7 = new Image();
    this.dinoRunImage8 = new Image();
    this.dinoDeadImage1 = new Image();
    this.dinoDeadImage2 = new Image();
    this.dinoDeadImage3 = new Image();
    this.dinoDeadImage4 = new Image();
    this.dinoDeadImage5 = new Image();
    this.dinoDeadImage6 = new Image();
    this.dinoDeadImage7 = new Image();
    this.dinoDeadImage8 = new Image();
    this.groundCentreImage = new Image();
    this.groundLeftImage = new Image();
    this.stoneBlockImage = new Image();

    var onLoadCallback = function() {
      imageCounter++;
      if (imageCounter == numberOfImages) {
        self._drawNewBackground();
        self._drawGround();
        self._drawDino();
        self._drawScore();
      }
    };

    this.dinoRunImage1.onload = onLoadCallback;
    this.dinoRunImage2.onload = onLoadCallback;
    this.dinoRunImage3.onload = onLoadCallback;
    this.dinoRunImage4.onload = onLoadCallback;
    this.dinoRunImage5.onload = onLoadCallback;
    this.dinoRunImage6.onload = onLoadCallback;
    this.dinoRunImage7.onload = onLoadCallback;
    this.dinoRunImage8.onload = onLoadCallback;
    this.dinoDeadImage1.onload = onLoadCallback;
    this.dinoDeadImage2.onload = onLoadCallback;
    this.dinoDeadImage3.onload = onLoadCallback;
    this.dinoDeadImage4.onload = onLoadCallback;
    this.dinoDeadImage5.onload = onLoadCallback;
    this.dinoDeadImage6.onload = onLoadCallback;
    this.dinoDeadImage7.onload = onLoadCallback;
    this.dinoDeadImage8.onload = onLoadCallback;
    this.backgroundImage.onload = onLoadCallback;
    this.groundCentreImage.onload = onLoadCallback;
    this.groundLeftImage.onload = onLoadCallback;
    this.stoneBlockImage.onload = onLoadCallback;

    // Create image objects
    this.dinoRunImage1.src = "images/dino_png/Run (1).png";
    this.dinoRunImage2.src = "images/dino_png/Run (2).png";
    this.dinoRunImage3.src = "images/dino_png/Run (3).png";
    this.dinoRunImage4.src = "images/dino_png/Run (4).png";
    this.dinoRunImage5.src = "images/dino_png/Run (5).png";
    this.dinoRunImage6.src = "images/dino_png/Run (6).png";
    this.dinoRunImage7.src = "images/dino_png/Run (7).png";
    this.dinoRunImage8.src = "images/dino_png/Run (8).png";
    this.dinoDeadImage1.src = "images/dino_png/Dead (1).png";
    this.dinoDeadImage2.src = "images/dino_png/Dead (2).png";
    this.dinoDeadImage3.src = "images/dino_png/Dead (3).png";
    this.dinoDeadImage4.src = "images/dino_png/Dead (4).png";
    this.dinoDeadImage5.src = "images/dino_png/Dead (5).png";
    this.dinoDeadImage6.src = "images/dino_png/Dead (6).png";
    this.dinoDeadImage7.src = "images/dino_png/Dead (7).png";
    this.dinoDeadImage8.src = "images/dino_png/Dead (8).png";
    this.backgroundImage.src = "images/bg.png";
    this.groundCentreImage.src = "images/deserttileset/png/Tile/2.png";
    this.groundLeftImage.src = "images/deserttileset/png/Tile/1.png";
    this.stoneBlockImage.src = "images/deserttileset/png/Objects/StoneBlock.png";
  }

  //=================================================================================
  //                           Animate Game
  //=================================================================================

  startGame(bpm, difficulty) { //frequencyArray, 
    this.blockGeneratorArray = [1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,1,1,0,1,0,0,1,1,1,1,1]
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
        if (self.gameOver == true) {
          clearInterval(gameInterval)
          self.animateDeath()
        }
      })
    }, self.frameInterval)
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
          self.gameController.gameComplete()
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
      let newGround = new this.groundClass(this.canvas, this.groundCentreImage)
      newGround.x = newGroundLoc
      this.groundArray.push(newGround)
    }
  }

  timeStepDino() {
    if (this.groundArray[0].x <= 300) {
      let filteredGround = this.groundArray.filter(function(item) {
        return item.x >= -20 && item.x <= 220;
      });
      if (filteredGround.length > 0 && this.dino.y <= this.canvas.height - 240 && this.dino.y >= this.canvas.height - 259) {
        this.dino.resetJump();
        this.dino.y = this.canvas.height - 240;
      } 
      else {
        this.dino.applyGravity();
      }
      this.dino.applyJump();
    }
    this.canvasContext.drawImage(this.dino.imageRun(), this.dino.x, this.dino.y, this.dino.xSize, this.dino.ySize);
  }

  timeStepBlocks() {
    if (this.frameCounter >= 300 && ((this.frameCounter - 300 + this.fpb) % this.fpb == 0)) { //always start with first block on inital 300th frame
      let newBlockValue = this.blockGeneratorArray.shift()
      if (newBlockValue == 1) {
        this.blocksArray.push(
          new this.blockClass(this.canvas, this.stoneBlockImage)
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
    this.canvasContext.drawImage(this.dino.imageDead(counter), this.dino.x, this.dino.y, this.dino.xSize, this.dino.ySize);
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
