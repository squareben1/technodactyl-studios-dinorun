class Score {
  constructor() {
    this.currentScore = 0
  }

  updateScore(frames) {
    return this.currentScore += Math.round(frames / 10)
  }

  jumpScore() {
    this.currentScore += 100
  }

  explodedCrate() {
    this.currentScore += 1000
  }
}

export default Score