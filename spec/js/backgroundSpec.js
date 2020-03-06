
describe("Background", function() {
  imageDouble = {}

  beforeEach(function() {
    background = new Background(imageDouble, 1280, 720)
    velocity = 60
  })

  describe('#constructor', function() {
    it("should have y attribute of 0", function() {
      expect(background.y).toEqual(0)
    })
    it("should have x attribute of 0", function() {
      expect(background.x).toEqual(0)
    })
    it("has background image as attribute", function() {
      expect(background.image).toEqual(imageDouble)
    })
  })

  describe('#move', function() {
    it("deduct objectVelocity divided by parralaxCorrection from x axis", function() {
      background.parallaxCorrection = 5
      background.move(10)
      expect(background.x).toEqual(-2)
    })
    it('should calculate overflow parameters if first method run', function() {
      background.move(velocity)
      expect(background.resetAt).toEqual(-1272)
    })
    it('should reset image if it is at the resetAt location', function() {
      background._calculateOverflowParameters(velocity)
      background.x = -1272
      background.move(velocity)
      expect(background.x).toEqual(1275)
    })
  })

  describe('#_calculateOverflowParameters', function() {
    it('generates resetAt location for background', function() {
      background._calculateOverflowParameters(velocity)
      expect(background.resetAt).toEqual(-1272)
    })
    it('generates resetTo location for background', function() {
      background._calculateOverflowParameters(velocity)
      expect(background.resetTo).toEqual(1275)
    })
  })
})