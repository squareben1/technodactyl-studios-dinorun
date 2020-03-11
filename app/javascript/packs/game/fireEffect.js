class FireEffect {
  constructor(fireImageArray) {
    this.fireImageArray = fireImageArray
    this.numImages = fireImageArray.length
    this.animationCounter = 0
    this.imageInterval = Math.floor(this.animationCounter / this.numImages)
  }

  activateFire() {
    this.animationCounter = 50
  }

  returnFireImage() {
    var imageIndex = Math.floor(this.animationCounter / this.imageInterval);
    var imageToReturn = this.runImageArray[imageIndex];
    this.animationCounter++;
    return imageToReturn
  }

  fireLocation(dino) {
    var xLoc = dino.x + (dino.xSize/2)
    var yLoc = dino.x + ((dino.ySize / 10) * 3)
    var xSize = dino.xSize
    var ySize = dino.ySize * 0.2
    return {xLoc: xLoc, yLoc: yLoc, xSize: xSize, ySize: ySize}
  }
}