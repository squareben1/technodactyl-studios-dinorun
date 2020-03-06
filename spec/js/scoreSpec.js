describe('Score', function() {
  var renderGameDouble = {
    frameCounter: 1000
  }

  it('divides framecounter by 10 to reach final score', function() {
    score = new Score()
    expect(score.updateScore(renderGameDouble.frameCounter)).toEqual(100)
  })

  
})