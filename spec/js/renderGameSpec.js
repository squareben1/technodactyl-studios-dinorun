
describe("RenderGame", function() {
  var canvasContextDouble = {
    drawImage: function() {
      return ''
    }
  }

  var canvasDouble = {
    width: 1280,
    height: 720,
    getContext: function(dimensions) {
      return canvasContextDouble
    }
  }
  
  beforeEach(function (done) {
    renderGame = new RenderGame(canvasDouble, Background, Ground, Dino) //Background/Ground double
    spy = spyOn(canvasContextDouble, 'drawImage')  
    renderGame.setup()
    setTimeout(done, 1000);
  })

  it('adds background images to backgroundArray', function() {
    expect(renderGame.backgroundArray.length).toEqual(2)
  })

  it('adds background, dino & ground images to canvas', function() {
    expect(spy).toHaveBeenCalledTimes(14)
  })

  it('drawGround adds ground obj to groundArray', function() {
    expect(renderGame.groundArray.length).toEqual(Math.ceil(canvasDouble.width / 120))
  })

  it('timestep background', function() {
    renderGame.timeStepBackground()
    expect(renderGame.backgroundArray[0].x).toEqual(-2.5)
  })

  it('background resets when it moves off page', function() {
    renderGame.backgroundArray[0].x = -canvasDouble.width + 2.5
    renderGame.timeStepBackground()
    expect(renderGame.backgroundArray[0].x).toEqual(canvasDouble.width)
  })

})