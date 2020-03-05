describe("Block", function() {
  canvasDouble = {
    width: 1280,
    height: 720
  }
  imageDouble = {}

  describe('#move', function() {
    it("move - takes velocity from location x", function() {
      block = new Block(canvasDouble, imageDouble)
      block.move(5)
      expect(block.x).toEqual(1275)
    })
  })
})