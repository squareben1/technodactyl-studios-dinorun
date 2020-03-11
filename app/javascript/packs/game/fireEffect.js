class FireEffect {
  constructor(fireEffectImageArray) {
    this.fireEffectImageArray = fireEffectImageArray
    this.numImages = fireEffectImageArray.length
    this.animationCount = 30
    this.animationCounter = 0
    this.imageInterval = Math.ceil(this.animationCount / this.numImages)
  }

  activateFire() {
    this.animationCounter = this.animationCount
  }

  returnImage() {
    var imageIndex = this.numImages - Math.ceil(this.animationCounter / this.imageInterval);
    var imageToReturn = this.fireEffectImageArray[imageIndex];
    this.animationCounter--;
    return imageToReturn
  }

  fireLocation(dino) {
    var xLoc = dino.x + (dino.xSize/2)
    var yLoc = dino.y + ((dino.ySize / 10) * 1)
    var xSize = dino.xSize
    var ySize = dino.ySize * 0.8
    return {xLoc: xLoc, yLoc: yLoc, xSize: xSize, ySize: ySize}
  }
}

export default FireEffect