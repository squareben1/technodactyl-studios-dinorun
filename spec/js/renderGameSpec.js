describe("RenderGame", function() {
  var canvasContextDouble = {
    drawImage: function() {
      return "";
    },
    strokeText: function() {
      return ''
    }
  };

  var canvasDouble = {
    width: 1280,
    height: 720,
    getContext: function(dimensions) {
      return canvasContextDouble;
    }
  };

  var imageDouble = {}

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
  
  describe('#timeStepBackground', function() { 
    it('timestep background', function() {
      renderGame.timeStepBackground()
      expect(renderGame.backgroundArray[0].x).toEqual(-2)
    })
  })

  describe("#timeStepGround", function() {
    it("timestep ground", function() {
      renderGame.timeStepGround();
      expect(renderGame.groundArray[0].x).toEqual(canvasDouble.width - renderGame.objectVelocity);
    });
    it('deletes first ground if off screen', function() {
      renderGame.groundArray[0].x = -240
      renderGame.groundArray[1] = new Ground(canvasDouble, imageDouble)
      renderGame.timeStepGround()
      expect(renderGame.groundArray[0].x).toEqual(1270)
    })
    it('generates new ground when last ground will be fully on screen', function() {
      renderGame.groundArray[0].x = 1165
      renderGame.timeStepGround()
      expect(renderGame.groundArray.length).toEqual(2)
    })
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

  describe('#deathInteractionBlock', function() {
    it('if objects do not intersect false is returned', function() {
      renderGame.blocksArray.push(new Block(canvasDouble, imageDouble))
      renderGame.blocksArray[0].x = renderGame.dino.x + renderGame.dino.xSize
      renderGame.dino.y = renderGame.blocksArray[0].y
      expect(renderGame.deathInteractionBlock(0)).toEqual(false)
    })

    it('if objects DO intersect true is returned', function() {
      renderGame.blocksArray.push(new Block(canvasDouble, imageDouble))
      renderGame.blocksArray[0].x = renderGame.dino.x + (renderGame.dino.xSize - 1)
      renderGame.dino.y = renderGame.blocksArray[0].y - (renderGame.dino.ySize - renderGame.blocksArray[0].ySize) / 2
      expect(renderGame.deathInteractionBlock(0)).toEqual(true)
    })
  })


});
