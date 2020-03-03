
class Dino {
  constructor() {
    this.y = 0
    this.spaceCounter = 0
    this.jumpCounter = 0
  }

  applyGravity() {
    this.y += 10
  }

  jump() {
    if (this.spaceCounter < 1) {
      this.spaceCounter += 1
      this.jumpCounter = 30
    }
  }
}