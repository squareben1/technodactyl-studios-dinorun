
class Ground {
  constructor(canvas, image) {
    this.canvasWidth = canvas.width 
    this.x = canvas.width
    this.y = canvas.height - 120
    this.xSize = 120
    this.ySize = 120
    this.image = image
  }

  move(velocity) {
    this.x -= velocity
  }

  isNewGroundNeeded(velocity) {
    // block.width % velocity == remainder 
    // canvas.width - block.width + remainder == addNewGroundLoc
    // canvas.width + remainder == newGroundLoc
    // return false if no, and adjusted location if yes
    let nextStep = this.canvasWidth - (this.x - velocity)
    if (nextStep >= this.xSize) {
      return (this.x + this.xSize)
    }
    else {
      return false
    }
  }
}

window.Ground = Ground