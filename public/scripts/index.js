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
var blockArray = []


function checkGame() {
  let filteredBlocks = blockArray.filter(function(item) {
    return item.x >= 20 && item.x <= 180
  })
  if (filteredBlocks.length > 0 && dino.y >= canvas.height - 320 && dino.y <= canvas.height - 240) {
    gameOver = true
  }
  if (dino.y >= canvas.height) {
    gameOver = true
  }
}


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
      groundArray.splice(i, 1)
    }
    else {
      groundArray[i].move()
    }
  }



  // Draw blocks

  if (groundArray[0].x <= canvas.width - 240) {
    if (Math.random(1) < 0.01) {
      blockArray.unshift(new Block())
    }
  }
  for (var i = 0; i < blockArray.length; i++) {
    canvasContext.drawImage(stoneBlock, blockArray[i].x, blockArray[i].y, 80, 80)
    blockArray[i].move()
  }
  if (blockArray.length > 0) {
    if (blockArray[blockArray.length - 1].x <= -80) {
      blockArray.pop()
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

  checkGame()
  refreshCount++

}

var refreshCount = 0
var animationFramHandle
var interval = setInterval(function() {
  cancelAnimationFrame(animationFramHandle);
  animationFramHandle = requestAnimationFrame(draw);
}, 16)

var gameOver = false;