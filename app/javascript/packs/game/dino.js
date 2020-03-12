class Dino {
  constructor(runImageArray, deadImageArray, jumpImageArray, canvas, imageInterval, gravity) {
    this.x = canvas.height / 7.2;
    this.y = canvas.height / 7.2;
    this.xSize = canvas.height / 6;
    this.ySize = canvas.height / 6;
    this.gravity = gravity;
    this.spaceCounter = 0;
    this.jumpCounter = 0;
    this.runImageArray = runImageArray;
    this.deadImageArray = deadImageArray;
    this.jumpImageArray = jumpImageArray;
    this.jumpImageCounter = 0;
    this.numRunImages = runImageArray.length;
    this.numJumpImages = jumpImageArray.length;
    this.imageInterval = imageInterval;
    this.animationCounterMax = this.numRunImages * this.imageInterval;
    this.animationCounter = 0;
    this.jumpSound = this.createJumpSound()
  }

  applyGravity() {
    this.y += this.gravity;
  }

  applyJump() {
    if (this.jumpCounter > 0) {
      this.y -= (this.jumpCounter / 2) * 2;
      this.jumpCounter -= 1;
    }
  }

  resetJump() {
    this.spaceCounter = 0;
    this.jumpImageCounter = 0;
  }

  jump() {
    if (this.spaceCounter < 2) {
      this.spaceCounter += 1;
      this.jumpCounter = 30;
      this.jumpSound.play()
    }
  }

  createJumpSound() {
    var jumpSound = document.createElement('audio')
    jumpSound.src = 'jump_sound.wav'
    jumpSound.type = 'audio/wav'
    return jumpSound
  }

  returnCurrentImage(){
    var imageToReturn
    if (this.spaceCounter > 0) {      
      imageToReturn = this.imageJump()
    } 
    else {
      imageToReturn = this.imageRun();
    }
    return imageToReturn;
  }

  imageRun() {
    var imageIndex = Math.min(Math.floor(this.animationCounter / this.imageInterval), 10)
    var imageToReturn = this.runImageArray[imageIndex];
    this.animationCounter++;
    if (this.animationCounter >= this.animationCounterMax) {
      this.animationCounter = 0;
    }
    return imageToReturn
  }

  imageJump() {
    var imageIndex
    var imageToReturn
    if (this.jumpImageCounter < this.imageInterval * 2) {
      imageIndex = Math.floor(this.jumpImageCounter / (this.imageInterval));    
    } else if ((this.jumpCounter < this.gravity) && (this.y - (2*this.ySize) > 0)) {
      imageIndex = Math.min(Math.round((this.y - (2*this.ySize))/ this.ySize) + 7, this.numJumpImages-1) 
    } else {
      imageIndex = Math.floor(((this.jumpImageCounter - (this.imageInterval * 2))/ (this.imageInterval / 2)) % 5) + 2
    }
    imageToReturn = this.jumpImageArray[imageIndex];
    this.jumpImageCounter++;
    return imageToReturn
  }

  imageDead(counter) {
    let imageIndex = Math.floor(counter / 10);
    return this.deadImageArray[imageIndex]
  }

  objectCentre() {
    return [this.x + (this.xSize / 2), this.y + (this.ySize / 2)]
  }

  objectRadius() {
    return this.xSize / 2
  }
}

export default Dino
