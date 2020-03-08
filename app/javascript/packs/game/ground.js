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
    let nextStep = this.canvasWidth - (this.x - velocity)
    if (nextStep >= this.xSize) {
      return (this.x + this.xSize)
    }
    else {
      return false
    }
  }
}

export default Ground