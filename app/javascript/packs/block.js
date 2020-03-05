
class Block {
  constructor(canvas, image) {
    this.x = canvas.width
    this.y = canvas.height - 200
    this.xSize = 120
    this.ySize = 120
    this.image = image
  }

  move(velocity) {
    this.x -= velocity
  }
}