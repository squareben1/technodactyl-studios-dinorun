
describe("Ground", function() {
  canvasDouble = {
    width: 1280,
    height: 720
  }
  imageDouble = {}

  describe('#move', function() {
    it("move - takes velocity from x", function() {
      ground = new Ground(canvasDouble, imageDouble)
      ground.move(10)
      expect(ground.x).toEqual(1270)
    })
  })
})
