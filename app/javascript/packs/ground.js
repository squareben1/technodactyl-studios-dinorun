
class Ground {
  constructor(canvas, image) {
    this.x = canvas.width
    this.y = canvas.height - 120
    this.xSize = 120
    this.ySize = 120
    this.image = image
  }

  move() {
    this.x -= 5
  }
}

window.Ground = Ground