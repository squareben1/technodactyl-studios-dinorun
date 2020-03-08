class Dino {
  constructor(runImageArray, deadImageArray) {
    this.x = 100;
    this.y = 100;
    this.xSize = 120;
    this.ySize = 120;
    this.spaceCounter = 0;
    this.jumpCounter = 0;
    this.runImageArray = runImageArray;
    this.deadImageArray = deadImageArray;
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
  }

  jump() {
    if (this.spaceCounter < 1) {
      this.spaceCounter += 1;
      this.jumpCounter = 30;
    }
  }

  imageRun() {
    let imageIndex = Math.floor(this.animationCounter / this.imageInterval);
    let imageToReturn = this.runImageArray[imageIndex];
    this.animationCounter++;
    if (this.animationCounter >= this.animationCounterMax) {
      this.animationCounter = 0;
    }
    return imageToReturn;
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

window.Dino = Dino;
