
describe("RenderGame", function() {

  canvasDouble = {
    width: 1280,
    getContext: function(dimensions) {
      return ''
    }
  }
  imageDouble = {}

  it("drawNewGame", function() {
    renderGame = new RenderGame(canvasDouble)
    renderGame.setup()
    expect(renderGame.backgroundArray.length).toEqual(2)
  })
})