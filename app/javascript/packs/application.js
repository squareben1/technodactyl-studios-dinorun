// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// window.imagePath = (name) => images(name, true)

// Game Packs
require("packs/game/background")
require("packs/game/ground")
require("packs/game/block")
require("packs/game/dino")
require("packs/game/score")
require("packs/game/renderGame")


require("packs/game/gameController")
require("packs/spotify/spotify")
require("packs/homepage_interface/songSelector")
require("packs/homepage_interface/userSession")
require("packs/homepage_interface/userInterface")
require("packs/mp3_analysis/mp3_info")

import Background from './game/background.js'
import Ground from './game/ground.js'
import Block from './game/block.js'
import Dino from './game/dino.js'
import score from './game/score.js'
import renderGame from './game/renderGame.js'


// Load Page => new game

window.addEventListener('load', function(){
  
  window.gameController = new GameController
  gameController.setupGame()

  
  window.songAnalyser = new SongAnalyser
  songAnalyser.setup()

})

