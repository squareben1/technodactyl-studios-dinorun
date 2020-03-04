
describe("Background", function() {
  canvasDouble = {
    width: 1280
  }
  imageDouble = {}

  beforeEach(function() {
    background = new Background(canvasDouble, imageDouble)
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
    it("deduct 2.5 from x axis", function() {
      background.move()
      expect(background.x).toEqual(-2.5)
    })
  })

  describe('#reset', function() {
    it("reset should reset x axis to canvas.width", function() {
      background.move()
      background.reset()
      expect(background.x).toEqual(canvasDouble.width)
    })
  })
})