class RenderGame {
  constructor(canvas, backgroundClass, groundClass, dinoClass, blockClass, scoreClass) {
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
  }

  //=================================================================================
  //                           Setup Game
  //=================================================================================

  setup() {
    this.frameCounter = 0;
    this.gameOver = false
    this.blocksArray = [];
    this.backgroundArray = [];
    this.groundArray = [];
    this._generateImages();
  }

  _drawScore() {
    this.newScore = new Score
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
      this.canvasContext.drawImage(
        this.backgroundArray[i].image,
        this.backgroundArray[i].x,
        this.backgroundArray[i].y,
        this.backgroundArray[i].xSize,
        this.backgroundArray[i].ySize
      );
    }
  }

  _drawGround() {
    let newGround = new this.groundClass(this.canvas, this.groundLeftImage);
    this.groundArray.push(newGround);
    this.canvasContext.drawImage(
      newGround.image,
      newGround.x,
      newGround.y,
      newGround.x,
      newGround.y
    );
  }

  _createDinoImageArray() {
    this.dinoImageArray = [];
    this.dinoImageArray.push(
      this.dinoImage1,
      this.dinoImage2,
      this.dinoImage3,
      this.dinoImage4,
      this.dinoImage5,
      this.dinoImage6,
      this.dinoImage7,
      this.dinoImage8
    );
  }

  _drawDino() {
    this._createDinoImageArray();
    let newDino = new this.dinoClass(this.dinoImageArray);
    this.canvasContext.drawImage(
      newDino.image(),
      newDino.x,
      newDino.y,
      newDino.xSize,
      newDino.ySize
    );
    this.dino = newDino;
  }

  _generateImages() {
    self = this;
    var imageCounter = 0;
    var numberOfImages = 5;

    this.backgroundImage = new Image();
    this.dinoImage1 = new Image();
    this.dinoImage2 = new Image();
    this.dinoImage3 = new Image();
    this.dinoImage4 = new Image();
    this.dinoImage5 = new Image();
    this.dinoImage6 = new Image();
    this.dinoImage7 = new Image();
    this.dinoImage8 = new Image();
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

    this.dinoImage1.onload = onLoadCallback;
    this.dinoImage2.onload = onLoadCallback;
    this.dinoImage3.onload = onLoadCallback;
    this.dinoImage4.onload = onLoadCallback;
    this.dinoImage5.onload = onLoadCallback;
    this.dinoImage6.onload = onLoadCallback;
    this.dinoImage7.onload = onLoadCallback;
    this.dinoImage8.onload = onLoadCallback;
    this.backgroundImage.onload = onLoadCallback;
    this.groundCentreImage.onload = onLoadCallback;
    this.groundLeftImage.onload = onLoadCallback;
    this.stoneBlockImage.onload = onLoadCallback;

    // Create image objects
    this.dinoImage1.src = "images/dino_png/Run (1).png";
    this.dinoImage2.src = "images/dino_png/Run (2).png";
    this.dinoImage3.src = "images/dino_png/Run (3).png";
    this.dinoImage4.src = "images/dino_png/Run (4).png";
    this.dinoImage5.src = "images/dino_png/Run (5).png";
    this.dinoImage6.src = "images/dino_png/Run (6).png";
    this.dinoImage7.src = "images/dino_png/Run (7).png";
    this.dinoImage8.src = "images/dino_png/Run (8).png";
    this.backgroundImage.src = "images/bg.png";
    this.groundCentreImage.src = "images/deserttileset/png/Tile/2.png";
    this.groundLeftImage.src = "images/deserttileset/png/Tile/1.png";
    this.stoneBlockImage.src =
      "images/deserttileset/png/Objects/StoneBlock.png";
    // this.groundCentreImage = new Image()
    // this.groundCentreImage.src = 'images/deserttileset/png/2.png'
    // this.groundLeftImage = new Image()
    // this.groundLeftImage.src = 'images/deserttileset/png/1.png'
    // this.groundRightImage = new Image()
    // this.groundRightImage.src = 'images/deserttileset/png/3.png'
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
    console.log('pixels to Dino')
    console.log(pixelsToDino)
    this.objectVelocity = (Math.round((pixelsToDino / this.fpb) / difficulty) / 2) * 2
    console.log('objectVelocity')
    console.log(this.objectVelocity)
  }

  animateGame() {
    self = this;
    var animationFrameHandle;
    var gameInterval = setInterval(function() {
      cancelAnimationFrame(animationFrameHandle);
      animationFrameHandle = requestAnimationFrame(function() {
        self.frameCounter++
        self.timeStepBackground()
        self.timeStepGround()
        self.timeStepDino()
        self.timeStepBlocks()
        self._drawScore();
        console.log(self.gameOver)
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
    this.canvasContext.drawImage(this.dino.image(), this.dino.x, this.dino.y, this.dino.xSize, this.dino.ySize);
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

  deathInteractionBlock(i) {
    let dinoCentre = this.dino.objectCentre()
    let blockCentre = this.blocksArray[i].objectCentre()
    let circlesDifference = Math.sqrt(((dinoCentre[0] - blockCentre[0])**2) + ((dinoCentre[1] - blockCentre[1])**2))
    let radiusSum = this.dino.objectRadius() + this.blocksArray[i].objectRadius()
    return circlesDifference < radiusSum
  }
}
window.RenderGame = RenderGame;
