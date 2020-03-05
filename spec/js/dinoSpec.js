describe("Dino", function() {
  beforeEach(function() {
    imageDouble = {};
    imageDouble2 = { a: 1 };
    dinoImageArray = [imageDouble, imageDouble2];
    dino = new Dino(dinoImageArray);
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

  describe("#jump", function() {
    it("jump increases spacecounter by 1 & sets jumpCounter to 30", function() {
      dino.jump();
      expect(dino.jumpCounter).toEqual(30);
      expect(dino.spaceCounter).toEqual(1);
    });
  });

  describe("#image", function() {
    it("returns first image in dinoImgArray", function() {
      expect(dino.image()).toEqual(dino.imageArray[0]);
    });

    it("returns second image in dinoImgArray", function() {
      dino.animationCounter = 31;
      expect(dino.image()).toEqual(dino.imageArray[1]);
    });
  });
});
