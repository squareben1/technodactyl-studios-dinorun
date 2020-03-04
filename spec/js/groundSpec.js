
describe("Ground", function() {
  canvasDouble = {
    width: 1280,
    height: 720
  }
  imageDouble = {}

  describe('#move', function() {
    it("move - takes 5 from x", function() {
      ground = new Ground(canvasDouble, imageDouble)
      ground.move()
      expect(ground.x).toEqual(1275)
    })
  })
})
