class Background {
  constructor(image, canvas) {
    this.x = 0
    this.y = 0
    this.xSize = canvas.height / 0.5625
    this.ySize = canvas.height
    this.image = image
    this.parallaxCorrection = 5
  }

  move(velocity) {
    if (typeof this.resetAt == 'undefined') {
      this._calculateOverflowParameters(velocity)
    }
    if (this.x <= this.resetAt) {
      this.x = this.resetTo
    }
    else {
      this.x -= Math.ceil(velocity / this.parallaxCorrection)
    }
  }

  _calculateOverflowParameters(velocity) {
    var adjustedVelocity = Math.ceil(velocity / this.parallaxCorrection)
    var widthRemainder = this.xSize % adjustedVelocity
    var overflow = adjustedVelocity - widthRemainder
    this.resetAt = -this.xSize + widthRemainder
    this.resetTo = (this.xSize - overflow) - 1
  }
}

export default Background