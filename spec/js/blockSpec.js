describe("Block", function() {
  canvasDouble = {
    width: 1280,
    height: 720
  }
  imageDouble = {}

  beforeEach(function() {
    block = new Block(canvasDouble, imageDouble)
  })    


  describe('#move', function() {
    it("move - takes velocity from location x", function() {
      block.move(10)
      expect(block.x).toEqual(1270)
    })
  })

  describe('#objectCentre', function() {
    it('returns centre point of dino object', function() {
      console.log()
      expect(block.objectCentre()).toEqual([1320, 560])
    })
  })
})