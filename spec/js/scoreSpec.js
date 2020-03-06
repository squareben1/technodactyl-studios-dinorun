describe('Score', function() {
  var renderGameDouble = {
    frameCounter: 1000
  }

  beforeEach(function() {
    score = new Score()
  })

  it('divides framecounter by 10 to reach final score', function() {
    expect(score.updateScore(renderGameDouble.frameCounter)).toEqual(100)
  })

  
})