import Score from '../packs/game/score.js'

describe('Score', function() {
  var score
  var renderGameDouble = { frameCounter: 1000 }

  beforeEach(function() {
    score = new Score()
  })

  describe("#updateScore", function() {
    it('divides framecounter by 10 to reach final score', function() {
      expect(score.updateScore(renderGameDouble.frameCounter)).toEqual(100)
    })
  })

  describe("#jumpScore", function() {
    it('adds 10 to score', function() {
      score.jumpScore()
      expect(score.currentScore).toEqual(10)
    })
  })
})