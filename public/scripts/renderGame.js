class RenderGame {
  setup() {
    this.canvas = document.getElementById('canvas')
    this.canvasContext = canvas.getContext('2d')
    this._generateImages()
    this.backgroundArray = []
    this.groundArray = []
    this.blockArray = []
  }

  _generateImages() {
    // Create image objects
    this.dinoImage = new Image()
    dinoImage.src = 'images/dino_png/Run (2).png'
    this.backgroundImage = new Image()
    backgroundImage.src = 'images/deserttileset/png/BG.png'
    this.stoneBlock = new Image()
    stoneBlock.src = 'images/deserttileset/png/Objects/StoneBlock.png'
    this.groundCentreImage = new Image()
    groundCentreImage.src = 'images/deserttileset/png/2.png'
    this.groundLeftImage = new Image()
    groundLeftImage.src = 'images/deserttileset/png/1.png'
    this.groundRightImage = new Image()
    groundRightImage.src = 'images/deserttileset/png/3.png'
  }
}
