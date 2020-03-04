
class Dino {
  constructor(image) {
    this.x = 100
    this.y = 100
    this.spaceCounter = 0
    this.jumpCounter = 0
    this.image = image
  }

  applyGravity() {
    this.y += 10
  }

  applyJump() {
    if (this.jumpCounter > 0) {
      this.y -= (this.jumpCounter / 5) * 5
      this.jumpCounter -= 1
    }
  }

  resetJump() {
    this.spaceCounter = 0
  }

  jump() {
    if (this.spaceCounter < 1) {
      this.spaceCounter += 1
      this.jumpCounter = 30
    }
  }

}

window.Dino = Dino