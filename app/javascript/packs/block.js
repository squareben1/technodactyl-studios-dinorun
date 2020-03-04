
class Block {
  constructor(canvas, image) {
    this.x = canvas.width
    this.y = canvas.height - 200
    this.image = image
  }

  move() {
    this.x -= 5
  }
}