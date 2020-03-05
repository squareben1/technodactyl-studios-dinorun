class Dino {
  constructor(imageArray) {
    this.x = 100;
    this.y = 100;
    this.xSize = 120;
    this.ySize = 120;
    this.spaceCounter = 0;
    this.jumpCounter = 0;
    this.imageArray = imageArray;
    this.numImages = imageArray.length;
    this.imageInterval = 20;
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

  image() {
    let imageIndex = Math.floor(this.animationCounter / this.imageInterval);
    console.log(imageIndex);
    let imageToReturn = this.imageArray[imageIndex];
    this.animationCounter++;
    if (this.animationCounter >= this.animationCounterMax) {
      this.animationCounter = 0;
    }
    return imageToReturn;
  }
}

window.Dino = Dino;
