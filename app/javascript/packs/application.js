
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

require("packs/background")
require("packs/renderGame")
require("packs/ground")
require("packs/block")
require("packs/dino")
require("packs/gameController")
require("packs/spotify/spotify")
require("packs/homepage_interface/songSelector")
require("packs/homepage_interface/userSession")
require("packs/homepage_interface/userInterface")
require("packs/mp3_analysis/mp3_info")

// Load Page => new game

window.addEventListener('load', function(){
  window.songSelector = new SongSelector
  songSelector.getSongList()
  
  window.gameController = new GameController
  gameController.setupGame()

  document.getElementById('start_game_btn').addEventListener('click', function(){
    songSelector.getSong()
  })

  // document.getElementById('create-song').addEventListener('click', function(){
  //   setTimeout(songSelector.updateSongList(), 1500)
  // })
})
