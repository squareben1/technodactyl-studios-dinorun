describe("Dino", function() {
  beforeEach(function() {
    imageDouble = {};
    imageDouble2 = { a: 1 };
    dinoRunImageArray = [imageDouble, imageDouble2];
    dinoDeadImageArray = [imageDouble, imageDouble2];
    dino = new Dino(dinoRunImageArray, dinoDeadImageArray);
  });

  describe("#applyGravity", function() {
    it("applyGravity adds 10 to y axis", function() {
      dino.applyGravity();
      expect(dino.y).toEqual(110);
    });
  });

  describe("#applyJump", function() {
    it("if spaceCounter > 0 -jumpCounter from Y -1 from jumpCounter", function() {
      dino.jumpCounter = 10;
      dino.applyJump();
      expect(dino.y).toEqual(90);
      expect(dino.jumpCounter).toEqual(9);
    });
  });

  describe("#resetJump", function() {
    it("resets spaceCounter after jump", function() {
      // rename?
      dino.spaceCounter = 2;
      dino.resetJump();
      expect(dino.spaceCounter).toEqual(0);
    });
  });

  describe('#imageDead', function() {
    it('returns corresponding images of dead dino', function() {
      expect(dino.imageDead(10)).toEqual(imageDouble2)
    })
  })

  describe("#jump", function() {
    it("jump increases spacecounter by 1 & sets jumpCounter to 30", function() {
      dino.jump();
      expect(dino.jumpCounter).toEqual(30);
      expect(dino.spaceCounter).toEqual(1);
    });
  });

  describe("#imageRun", function() {
    it("returns first image in dinoImgArray", function() {
      expect(dino.imageRun()).toEqual(dinoRunImageArray[0]);
    });

    it("returns second image in dinoImgArray", function() {
      dino.animationCounter = dino.imageInterval;
      expect(dino.imageRun()).toEqual(dinoRunImageArray[1]);
    });

    it("increments dino.animationCounter by 1", function() {
      dino.imageRun();
      expect(dino.animationCounter).toEqual(1);
    });
  });

  describe('#objectCentre', function() {
    it('returns centre point of dino object', function() {
      expect(dino.objectCentre()).toEqual([160, 160])
    })
  })

  describe('#objectRadius', function() {
    it('returns radius of object circle', function() {
      expect(dino.objectRadius()).toEqual(60)
    })
  })
});
