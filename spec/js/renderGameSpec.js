
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

  var imageDouble = {}

  var goundDouble = {
    x: canvasDouble.width,
    y: canvasDouble.height-120,
    image: imageDouble
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

  it('Animate background', function() {
    renderGame.timeStepBackground()
    expect(renderGame.backgroundArray[0].x).toEqual(-2.5)
  })

})