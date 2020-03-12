class Block {
  constructor(canvas, image) {
    this.xSize = canvas.height / 9
    this.ySize = canvas.height / 9
    this.x = canvas.width
    this.y = canvas.height - this.xSize - (canvas.height / 6)
    this.image = image
  }

  move(velocity) {
    this.x -= velocity
  }

  objectCentre() {
    return [this.x + (this.xSize / 4), this.y + (this.ySize / 4)]
  }

  objectRadius() {
    return this.xSize / 4
  }
}

export default Block