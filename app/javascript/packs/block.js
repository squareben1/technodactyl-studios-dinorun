class Block {
  constructor(canvas, image) {
    this.x = canvas.width
    this.y = canvas.height - 200
    this.xSize = 80
    this.ySize = 80
    this.image = image
  }

  move(velocity) {
    this.x -= velocity
  }
}

window.Block = Block