
describe("Ground", function() {
  canvasDouble = {
    width: 1280,
    height: 720
  }
  imageDouble = {}

  beforeEach(function() {
    ground = new Ground(canvasDouble, imageDouble)
    velocity = 9
  });

  describe('#move', function() {
    it("move - takes velocity from x", function() {
      ground.move(10)
      expect(ground.x).toEqual(1270)
    })
  })

  describe('#isNewGroundNeeded', function() {
    it('returns false if block will not leave empty space on next move', function() {
      ground.x = 1280
      expect(ground.isNewGroundNeeded(velocity)).toEqual(false)
    })
    it('returns new location if block will will leave empty space on next move', function() {
      ground.x = 1165
      expect(ground.isNewGroundNeeded(velocity)).toEqual(1285)
    })
  })
})
