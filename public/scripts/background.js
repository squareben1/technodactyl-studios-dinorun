
class Background {
  constructor(canvas) {
    this.x = 0
    this.y = 0
    this.canvas = canvas
  }

  move() {
    this.x -= 2.5
  }

  reset() {
    this.x = this.canvas.width
  }
}