var canvas = document.getElementById('canvas')
var canvasContext = canvas.getContext('2d')

// Create image objcects

var dinoImage = new Image()
dinoImage.src = 'images/dino_run.png'
var backgroundImage = new Image()
backgroundImage.src = 'images/background_desert.png'
var stoneBlock = new Image()
stoneBlock.src = 'images/stone_block.png'

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
console.log(backgroundArray)

class Dino {
  constructor() {
    this.x = 100
    this.y = 100
  }

  applyGravity() {
    this.y += 5
  }
}
var dino = new Dino()


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


  // Draw Dino
  canvasContext.drawImage(dinoImage,dino.x,dino.y,100,100)
  dino.applyGravity()



  // Draw blocks
  for (var i = 0; i < blocks.length; i++) {
    canvasContext.drawImage(stoneBlock, blocks[i].x, blocks[i].y, 80, 80)
    blocks[i].move()

    if ((i == blocks.length - 1) && (blocks[i].x <= canvas.width - 240)) {
      if (Math.random(1) < 0.05) {
        blocks.push(new Block())
      }
    }
  }


  requestAnimationFrame(draw)

}

draw()