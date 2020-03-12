class FireEffect {
  constructor(fireEffectImageArray, dino) {
    this.fireEffectImageArray = fireEffectImageArray
    this.numImages = fireEffectImageArray.length
    this.xSize = dino.xSize
    this.ySize = dino.ySize
    this.animationCount = 30
    this.animationCounter = 0
    this.imageInterval = Math.ceil(this.animationCount / this.numImages)
    this.fireEffectSound = this.createFireSound()
  }

  createFireSound() {
    var fireSound = document.createElement('audio')
    fireSound.src = 'firesound2.wav'
    fireSound.type = 'audio/wav'
    return fireSound
  }

  activateFire() {
    this.fireEffectSound.play()
    this.animationCounter = this.animationCount
  }

  returnImage() {
    var imageIndex = this.numImages - Math.ceil(this.animationCounter / this.imageInterval);
    var imageToReturn = this.fireEffectImageArray[imageIndex];
    this.animationCounter--;
    return imageToReturn
  }

  fireLocation(dino) {
    var xLoc = dino.x + (dino.xSize/3)
    var yLoc = dino.y
    return {xLoc: xLoc, yLoc: yLoc, xSize: this.xSize, ySize: this.ySize}
  }

  killCrates(crateArray, fireEffectLocationHash, score){
    var bottomOfFire = fireEffectLocationHash['yLoc'] + fireEffectLocationHash['ySize']
    var topOfFire = fireEffectLocationHash['yLoc']
    var frontOfFire = fireEffectLocationHash['xLoc'] + fireEffectLocationHash['xSize']
    var backOfFire = fireEffectLocationHash['xLoc']

    var crateInRange = crateArray.find( function(crate) {
      return (crate.y >= topOfFire) && (crate.y <= bottomOfFire) && (crate.x >= backOfFire) && (crate.x <= frontOfFire)
    })

    if (typeof crateInRange !== 'undefined') {
      crateInRange.exploded = true
      score.explodedCrate()
    }
  }
}

export default FireEffect