import Block from '../packs/game/block.js'

describe("Block", function() {
  var block
  var imageDouble = {}
  var canvasDouble = { width: 1280, height: 720 }
  
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
      expect(block.objectCentre()).toEqual([1320, 560])
    })
  })

  describe('#objectRadius', function() {
    it('returns radius of object circle', function() {
      expect(block.objectRadius()).toEqual(40)
    })
  })
})