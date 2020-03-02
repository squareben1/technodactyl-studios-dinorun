var canvas = document.getElementById('canvas')
var canvasContext = canvas.getContext('2d')

// Create image objcects

var dinoImage = new Image()
dinoImage.src = 'images/dino_run.png'
var backgroundImage = new Image()
backgroundImage.src = 'images/background_desert.png'
var stoneBlock = new Image()
stoneBlock.src = 'images/stone_block.png'
var groundCentreImage = new Image()
var groundLeftImage = new Image()
var groundRightImage = new Image()
groundCentreImage.src = 'images/ground_centre.png'
groundLeftImage.src = 'images/ground_left.png'
groundRightImage.src = 'images/ground_right.png'

class Background {
  constructor() {
    this.x = 0
    this.y = 0
  }

  reset() {
    this.x = canvas.width
  }

  move() {
    this.x -= 2.5
  }
}
var backgroundArray = []
backgroundArray.push(new Background())
let secondBackground = new Background()
secondBackground.reset()
backgroundArray.push(secondBackground)



class GroundCentre {
  constructor() {
    this.x = canvas.width
    this.y = canvas.height - 120
    this.type = groundCentreImage
  }

  move() {
    this.x -= 5
  }
}
var groundArray = [new GroundCentre()]



class Dino {
  constructor() {
    this.x = 100
    this.y = 100
    this.jumpCounter = 0
    this.spaceCounter = 0
  }

  applyGravity() {
    this.y += 10
  }

  applyJump() {
    if (this.jumpCounter > 0) {
      this.y -= (Math.min(this.jumpCounter, 30) / 5) * 5
      this.jumpCounter -= 1
    }
  }

  resetJump() {
    this.spaceCounter = 0
  }

  jump() {
    if (this.spaceCounter < 1) {
      this.spaceCounter += 1
      this.jumpCounter = 30
    }
  }
}
var dino = new Dino()

document.body.onkeyup = function(e){
  if(e.keyCode == 32){
    dino.jump()
  }
}



class Block {
  constructor() {
    this.x = canvas.width
    this.y = canvas.height - 200
  }

  move() {
    this.x -= 5
  }
}
var blocks = []
blocks.push(new Block())




function draw() {
  // Draw background
  for (var i = 0; i < backgroundArray.length; i++) {
    canvasContext.drawImage(backgroundImage, backgroundArray[i].x, backgroundArray[i].y)
    if (backgroundArray[i].x == -canvas.width) {
      backgroundArray[i].reset()
    }
    else {
      backgroundArray[i].move()
    }
  }

  // Draw Ground
  for (var i = 0; i < groundArray.length; i++) {
    canvasContext.drawImage(groundArray[i].type, groundArray[i].x, groundArray[i].y, 120, 120)
    if ((i == groundArray.length - 1) && (groundArray[i].x <= canvas.width - 120)) {
      groundArray.push(new GroundCentre())
      
    }
    if (groundArray[i].x <= -240) {
      groundArray.splice(i, 1);
    }
    else {
      groundArray[i].move()
    }
  }



  // Draw Dino
  canvasContext.drawImage(dinoImage,dino.x,dino.y,120,120)
  if (groundArray[0].x <= 500) {
    let filteredGround = groundArray.filter(function(item) {
        return item.x >= -20 && item.x <= 220
    })
    if (filteredGround.length > 0 && (dino.y <= canvas.height - 240 && dino.y >= canvas.height - 259)) {
      dino.resetJump()
      dino.y = canvas.height - 240
    }
    else {
      dino.applyGravity()
    }
    dino.applyJump()
  }
  



  // Draw blocks
  for (var i = 0; i < blocks.length; i++) {
    canvasContext.drawImage(stoneBlock, blocks[i].x, blocks[i].y, 80, 80)
    blocks[i].move()

    if ((i == blocks.length - 1) && (blocks[i].x <= canvas.width - 240)) {
      if (Math.random(1) < 0.01) {
        blocks.push(new Block())
      }
    }
  }


  requestAnimationFrame(draw)

}

draw()