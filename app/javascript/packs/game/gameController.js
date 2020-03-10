// Import dependencies
import Score from './score.js'
import Ground from './ground.js'
import Dino from './dino.js'
import Block from './block.js'
import Background from './background.js'
import RenderGame from './renderGame.js'
import loadGameImages from './loadImages.js'
import { generateBlocksFromAmplitudeArray } from '../game/mapGenerator.js'

class GameController {
  async setupGame() {
    this.canvas = document.getElementById('canvas')
    var loadedImages = await loadGameImages()
    this.game = new RenderGame(canvas, loadedImages, Background, Ground, Dino, Block, Score, this)
    this.game.setup()
  }

  startGame(data, audioElement) {
    var amplitudeArray = JSON.parse(data['analysed'])
    var generatedBlockArray = generateBlocksFromAmplitudeArray(amplitudeArray)
    this.game.startGame(data["bpm"], 1.5, generatedBlockArray) //bpm, difficulty(blocks on screen, lower = faster and fewer)
    setTimeout(function() {
      audioElement.play()
    }, 3900)
    self = this
    document.body.onkeyup = function(e){
      if(e.keyCode == 32){
        self.game.dino.jump()
      }
    }
  }

  playDeathSound(){
    var audioPlayer = document.querySelector('#song_player')
    audioPlayer.innerHTML = ""
    var sound = document.createElement('audio')
    sound.src = 'dinodie.mp3'
    sound.type = 'audio/mpeg'
    sound.autoplay = true
    audioPlayer.appendChild(sound)
  }

  gameComplete(score) {
    // Ajax score to leaderboard database
    // Display navbar
    // Play theme tune
    document.querySelector('#logged-in').style.display = 'block'
  }
}

export default GameController
