describe("Block", function() {
  canvasDouble = {
    width: 1280,
    height: 720
  }
  imageDouble = {}

  describe('#move', function() {
    it("move - takes velocity from location x", function() {
      block = new Block(canvasDouble, imageDouble)
      block.move(10)
      expect(block.x).toEqual(1270)
    })
  })
})