
xdescribe("RenderGame", function() {
  canvasContextDouble = {
    drawImage: function() {
      return ''
    }
  }
  canvasDouble = {
    width: 1280,
    getContext: function(dimensions) {
      return canvasContextDouble
    }
  }
  imageDouble = {}

  beforeAll(function (done) {
    renderGame = new RenderGame(canvasDouble, Background)
    spy = spyOn(canvasContextDouble, 'drawImage')  
    renderGame.setup()
    setTimeout(done, 4000);
  })

  it('adds background images to backgroundArray', function() {
    console.log(renderGame)
    expect(renderGame.backgroundArray.length).toEqual(2)
  })

  it('adds background images to canvas', function() {
    expect(spy).toHaveBeenCalledTimes(2)
  })
})