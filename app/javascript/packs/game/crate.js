class Crate {
  constructor(canvas, imageArray) {
    this.x = canvas.width
    this.y = Math.floor(Math.random() * (canvas.height/2)) 
    this.xSize = 80
    this.ySize = 80
    this.imageArray = imageArray
    this.exploded = false
    this.explosionCounter = 0
    this.explosionInterval = 10
  }

  returnImage(){
    var imageIndex = 0
    if (this.exploded == false){
      imageIndex = 0
    } else {
      imageIndex = Math.floor(this.explosionCounter / this.explosionInterval) + 1;
      this.explosionCounter++    
    }
    return this.imageArray[imageIndex]
  }

  move(velocity) {
    this.x -= velocity
  }

  objectCentre() {
    return [this.x + (this.xSize / 2), this.y + (this.ySize / 2)]
  }

  objectRadius() {
    return this.xSize / 4
  }
}

export default Crate