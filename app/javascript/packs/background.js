class Background {
  constructor(canvas, image) {
    this.x = 0
    this.y = 0
    this.xSize = canvas.width
    this.ySize = canvas.height
    this.canvas = canvas
    this.image = image
  }

  move() {
    this.x -= 2.5
  }

  reset() {
    this.x = this.canvas.width
  }
}

window.Background = Background