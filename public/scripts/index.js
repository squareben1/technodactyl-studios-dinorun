var cvs = document.getElementById('canvas')

var ctx = cvs.getContext('2d')

var dino = new Image()
dino.src = 'images/dino_run.png'
var background = new Image()
background.src = 'images/background_desert.png'
var stoneBlock = new Image()
stoneBlock.src = 'images/stone_block.png'

var dinoX = 100
var dinoY = 100

var blocks = []

class Block {
  constructor() {
    this.x = cvs.width
    this.y = cvs.height - 200
  }

  move() {
    this.x -= 5
  }
}

blocks.push(new Block())



function draw() {
  // Draw blocks


  ctx.drawImage(background,0,0)
  ctx.drawImage(dino,dinoX,dinoY,100,100)

  for (var i = 0; i < blocks.length; i++) {
    ctx.drawImage(stoneBlock, blocks[i].x, blocks[i].y, 80, 80)
    blocks[i].move()

    if ((i == blocks.length - 1) && (blocks[i].x <= cvs.width - 240)) {
      if (Math.random(1) < 0.05) {
        blocks.push(new Block())
      }
    }

  }



  dinoY += 10
  requestAnimationFrame(draw)

}

draw()