describe("RenderGame", function() {
  var canvasContextDouble = {
    drawImage: function() {
      return "";
    }
  };

  var canvasDouble = {
    width: 1280,
    height: 720,
    getContext: function(dimensions) {
      return canvasContextDouble;
    }
  };

  beforeEach(function(done) {
    renderGame = new RenderGame(canvasDouble, Background, Ground, Dino); //Background/Ground double
    spy = spyOn(canvasContextDouble, "drawImage");
    renderGame.setup();
    renderGame.objectVelocity = 10;
    setTimeout(done, 500);
  });

  describe("#setup", function() {
    it("adds background images to backgroundArray", function() {
      expect(renderGame.backgroundArray.length).toEqual(2);
    });

    it("adds background, dino & ground images to canvas", function() {
      expect(spy).toHaveBeenCalledTimes(4);
    });

    it("drawGround adds ground obj to groundArray", function() {
      expect(renderGame.groundArray.length).toEqual(1);
    });
  });

  describe("#timeStepBackground", function() {
    it("timestep background", function() {
      renderGame.timeStepBackground();
      expect(renderGame.backgroundArray[0].x).toEqual(
        -renderGame.objectVelocity / 2
      );
    });

    it("background resets when it moves off page", function() {
      renderGame.backgroundArray[0].x =
        -canvasDouble.width + renderGame.objectVelocity / 2;
      renderGame.timeStepBackground();
      expect(renderGame.backgroundArray[0].x).toEqual(canvasDouble.width);
    });
  });

  describe("#timeStepGround", function() {
    it("timestep ground", function() {
      renderGame.timeStepGround();
      expect(renderGame.groundArray[0].x).toEqual(
        canvasDouble.width - renderGame.objectVelocity
      );
    });

    it("new ground gets added when last position is fully on screen", function() {
      renderGame.groundArray[renderGame.groundArray.length - 1].x =
        canvasDouble.width - 120;
      renderGame.timeStepGround();
      console.log(canvasDouble.width);
      console.log(this.objectVelocity);
      expect(
        renderGame.groundArray[renderGame.groundArray.length - 1].x
      ).toEqual(canvasDouble.width - renderGame.objectVelocity);
    });
  });

  describe("#timeStepDino", function() {
    it("dino gravity is not applied until ground is close enough for landing", function() {
      renderGame.groundArray[0].x = 301;
      renderGame.timeStepDino();
      expect(renderGame.dino.y).toEqual(100);
    });

    it("dino gravity is applied once ground is close enough for landing", function() {
      renderGame.groundArray[0].x = 300;
      renderGame.timeStepDino();
      expect(renderGame.dino.y).toEqual(110);
    });

    it("interaction with dino and ground stop gravitiy", function() {
      renderGame.groundArray[0].x = renderGame.dino.x;
      renderGame.dino.y = canvasDouble.height - 240;
      renderGame.timeStepDino();
      expect(renderGame.dino.y).toEqual(480);
    });

    it("resets dino jump counter on interaction with ground", function() {
      renderGame.groundArray[0].x = renderGame.dino.x;
      renderGame.dino.y = canvasDouble.height - 240;
      renderGame.dino.spaceCounter = 2;
      renderGame.timeStepDino();
      expect(renderGame.dino.spaceCounter).toEqual(0);
    });

    it("dino jumps if jumpcounter has value", function() {
      renderGame.groundArray[0].x = renderGame.dino.x;
      renderGame.dino.y = 500;
      renderGame.dino.jumpCounter = 20;
      renderGame.timeStepDino();
      expect(renderGame.dino.y).toEqual(490);
    });
  });
});
