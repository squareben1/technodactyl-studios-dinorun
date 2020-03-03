class RenderGame {
  constructor(canvas) {
    this.canvas = canvas
    this.canvasContext = this.canvas.getContext('2d')
  }

  setup() {
    this._generateImages()
    this.backgroundArray = []
    this.groundArray = []
    this.blockArray = []
    this._drawNewGame()
  }

  _drawNewGame() {
    this.backgroundArray = []
    this.backgroundArray.push(new Background(this.canvas, this.backgroundImage))
    var secondBackground = new Background(this.canvas, this.backgroundImage)
    secondBackground.reset()
    this.backgroundArray.push(secondBackground)
    // for (var i = 0; i < this.canvas.clientWidth; i++)
    //   this.backgroundArray.push()
  }

  _generateImages() {
    // Create image objects
    this.dinoImage = new Image()
    this.dinoImage.src = 'images/dino_png/Run (2).png'
    this.backgroundImage = new Image()
    this.backgroundImage.src = 'images/deserttileset/png/BG.png'
    this.stoneBlock = new Image()
    this.stoneBlock.src = 'images/deserttileset/png/Objects/StoneBlock.png'
    this.groundCentreImage = new Image()
    this.groundCentreImage.src = 'images/deserttileset/png/2.png'
    this.groundLeftImage = new Image()
    this.groundLeftImage.src = 'images/deserttileset/png/1.png'
    this.groundRightImage = new Image()
    this.groundRightImage.src = 'images/deserttileset/png/3.png'
  }
}
