
describe("RenderGame", function() {
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

  it('adds background images to backgroundArray', function() {
    renderGame = new RenderGame(canvasDouble)
    renderGame.setup()
    expect(renderGame.backgroundArray.length).toEqual(2)
  })

  it('adds background images to canvas', function() {
    renderGame = new RenderGame(canvasDouble)
    var spy = spyOn(canvasContextDouble, 'drawImage')  
    renderGame.setup()
    expect(spy).toHaveBeenCalledTimes(2)
  })
})