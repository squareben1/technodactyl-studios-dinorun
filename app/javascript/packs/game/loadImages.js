// Async functions
// ===============================
async function loadImages(imageUrlArray) {
  const promiseArray = []
  const imageArray = [] 

  for (let imageUrl of imageUrlArray) {
    promiseArray.push(new Promise(resolve => {
      const img = new Image()
      img.onload = resolve
      img.src = imageUrl
      imageArray.push(img)
    }))
  }

  await Promise.all(promiseArray)
  return imageArray
}

async function loadImage(imageUrl) {
  let img

  const imageLoadPromise = new Promise(resolve => {
      img = new Image()
      img.onload = resolve
      img.src = imageUrl
  })

  await imageLoadPromise
  return img
}

// Image Urls
// ===============================

var dinoRunImageUrlArray = [
  "images/dino_png/Run (1).png",
  "images/dino_png/Run (2).png",
  "images/dino_png/Run (3).png",
  "images/dino_png/Run (4).png",
  "images/dino_png/Run (5).png",
  "images/dino_png/Run (6).png",
  "images/dino_png/Run (7).png",
  "images/dino_png/Run (8).png"
]

var dinoDeadImageUrlArray = [
  "images/dino_png/Dead (1).png",
  "images/dino_png/Dead (2).png",
  "images/dino_png/Dead (3).png",
  "images/dino_png/Dead (4).png",
  "images/dino_png/Dead (5).png",
  "images/dino_png/Dead (6).png",
  "images/dino_png/Dead (7).png",
  "images/dino_png/Dead (8).png"
]

var dinoJumpImageUrlArray = [
  "images/dino_png/Jump (3).png",
  "images/dino_png/Jump (4).png",
  "images/dino_png/Jump (5).png",
  "images/dino_png/Jump (6).png",
  "images/dino_png/Jump (7).png",
  "images/dino_png/Jump (8).png",
  "images/dino_png/Jump (9).png",
  "images/dino_png/Jump (10).png",
  "images/dino_png/Jump (11).png",
  "images/dino_png/Jump (12).png"
]

var groundImageUrlArray = [
  "images/deserttileset/png/Tile/1.png",
  "images/deserttileset/png/Tile/2.png",
  "images/deserttileset/png/Tile/3.png"
]

var backgroundImageUrl = "images/bg.png"
var stoneBlockImageUrl = "images/deserttileset/png/Objects/StoneBlock.png"
var endSignImageUrl = "images/endsign.png"

// Export function
// ===============================

export default async function loadGameImages(){
  var dinoRunImageArray = await loadImages(dinoRunImageUrlArray)
  var dinoDeadImageArray = await loadImages(dinoDeadImageUrlArray)
  var dinoJumpImageArray = await loadImages(dinoJumpImageUrlArray)
  var groundImageArray = await loadImages(groundImageUrlArray)
  var backgroundImage = await loadImage(backgroundImageUrl)
  var stoneBlockImage = await loadImage(stoneBlockImageUrl)
  var endSignImage = await loadImage(endSignImageUrl)

  return {
    dinoRunImageArray: dinoRunImageArray,
    dinoDeadImageArray: dinoDeadImageArray,
    dinoJumpImageArray: dinoJumpImageArray,
    groundImageArray: groundImageArray,
    backgroundImage: backgroundImage,
    stoneBlockImage: stoneBlockImage,
    endSignImage: endSignImage
  }
}