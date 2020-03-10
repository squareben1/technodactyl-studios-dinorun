class Dino {
  constructor(runImageArray, deadImageArray, jumpImageArray) {
    this.x = 100;
    this.y = 100;
    this.xSize = 120;
    this.ySize = 120;
    this.spaceCounter = 0;
    this.jumpCounter = 0;
    this.runImageArray = runImageArray;
    this.deadImageArray = deadImageArray;
    this.jumpImageArray = jumpImageArray;
    this.jumpImageCounter = 0;
    this.numImages = runImageArray.length;
    this.imageInterval = 10;
    this.animationCounterMax = this.numImages * this.imageInterval;
    this.animationCounter = 0;
  }

  applyGravity() {
    this.y += 10;
  }

  applyJump() {
    if (this.jumpCounter > 0) {
      this.y -= (this.jumpCounter / 5) * 5;
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
    }
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
    var imageIndex = Math.floor(this.animationCounter / this.imageInterval);
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
    } else if(this.y > 269 && this.jumpCounter < 10){
      imageIndex = Math.min(Math.floor((this.y - 270)/ 71) + 7, this.numImages-1) 
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
