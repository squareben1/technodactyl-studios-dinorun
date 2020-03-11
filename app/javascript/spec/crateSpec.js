import Crate from '../packs/game/crate.js'

describe("Crate", function() {
  var crate
  var imageDouble = [{}]
  var canvasDouble = { width: 1280, height: 720 }
  
  beforeEach(function() {
    crate = new Crate(canvasDouble, imageDouble)
  })    

  describe('#move', function() {
    it("move - takes velocity from location x", function() {
      crate.move(10)
      expect(crate.x).toEqual(1270)
    })
  })

  describe('#objectCentre', function() {
    it('returns centre point of crate object', function() {
      crate.y = 520
      expect(crate.objectCentre()).toEqual([1320, 560])
    })
  })

  describe('#objectRadius', function() {
    it('returns radius of object circle, halfed for gameplay', function() {
      expect(crate.objectRadius()).toEqual(20)
    })
  })
})