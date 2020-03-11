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

var crateImageUrlArray = [
  "images/deserttileset/png/Objects/Crate.png",
  "images/explosion/tile002.png",
  "images/explosion/tile003.png",
  "images/explosion/tile004.png",
  "images/explosion/tile005.png",
  "images/explosion/tile006.png",
  "images/explosion/tile007.png",
  "images/explosion/tile008.png",
  "images/explosion/tile009.png"
]

var fireEffectImageUrlArray = [
  'public/images/fire/tile002.png',
  'public/images/fire/tile003.png',
  'public/images/fire/tile004.png',
  'public/images/fire/tile006.png',
  'public/images/fire/tile007.png',
  'public/images/fire/tile008.png',
  'public/images/fire/tile009.png',
  'public/images/fire/tile010.png',
  'public/images/fire/tile012.png',
  'public/images/fire/tile013.png',
  'public/images/fire/tile014.png',
  'public/images/fire/tile015.png',
  'public/images/fire/tile016.png',
  'public/images/fire/tile018.png',
  'public/images/fire/tile019.png',
  'public/images/fire/tile020.png',
  'public/images/fire/tile021.png',
  'public/images/fire/tile022.png',
  'public/images/fire/tile024.png',
  'public/images/fire/tile025.png',
  'public/images/fire/tile026.png',
  'public/images/fire/tile027.png',
  'public/images/fire/tile028.png'
]

var backgroundImageUrl = "images/bg.png"
var stoneBlockImageUrl = "images/deserttileset/png/Objects/StoneBlock.png"
var endSignImageUrl = "images/endsign.png"
var replayImageUrl = "images/replay.png"

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
  var replayImage = await loadImage(replayImageUrl)
  var crateImageArray = await loadImages(crateImageUrlArray)
  var fireEffectImageArray = await loadImages(fireEffectImageUrlArray)

  return {
    dinoRunImageArray: dinoRunImageArray,
    dinoDeadImageArray: dinoDeadImageArray,
    dinoJumpImageArray: dinoJumpImageArray,
    groundImageArray: groundImageArray,
    backgroundImage: backgroundImage,
    stoneBlockImage: stoneBlockImage,
    endSignImage: endSignImage,
    replayImage: replayImage,
    crateImageArray: crateImageArray,
    fireEffectImageArray: fireEffectImageArray
  }
}