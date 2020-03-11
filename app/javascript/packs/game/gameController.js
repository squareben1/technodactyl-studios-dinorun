// Import dependencies
import Score from './score.js'
import Ground from './ground.js'
import Dino from './dino.js'
import Block from './block.js'
import Crate from './crate.js'
import Background from './background.js'
import RenderGame from './renderGame.js'
import loadGameImages from './loadImages.js'
import { generateMapFromAmplitudeArray } from '../game/mapGenerator.js'

class GameController {
  constructor() {
    this.songData = ''
  }

  async setupGame() {
    this.canvas = document.getElementById('canvas')
    var loadedImages = await loadGameImages()
    this.game = new RenderGame(canvas, loadedImages, Background, Ground, Dino, Block, Score, this, Crate)
    this.game.setup()
  }

  startGame(data, audioElement) {
    this.songData = data
    this.audioElement = audioElement
    var amplitudeArray = JSON.parse(data['analysed'])
    var generatedBlockArray = generateMapFromAmplitudeArray(amplitudeArray)
    console.log(data["bpm"])
    this.game.startGame(data["bpm"], ((data['bpm']/220)*4), generatedBlockArray) //bpm, difficulty(blocks on screen, lower = faster and fewer)
    
    self = this
    setTimeout(function() {
      self.audioElement.play()
    }, 3500)

    document.body.onkeyup = function(e){
      if(e.keyCode == 32){
        self.game.dino.jump()
      }
      if(e.keyCode == 68) {
        self.game.crateAttack()
      }
    }
  }

  playDeathSound(){
    this.audioElement.pause()
    this.audioElement = {play: function(){}}
    var audioPlayer = document.querySelector('#song_player')
    audioPlayer.innerHTML = ""
    var sound = document.createElement('audio')
    sound.src = 'dinodie.mp3'
    sound.type = 'audio/mpeg'
    sound.autoplay = true
    audioPlayer.appendChild(sound)
  }

  getScores() {
    var self = this
    $.ajax({
      url: `/scores/${this.songData['id']}.json`,
      type: 'GET',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))}
    }).done(function(data) {
      self.game._drawTopThree(data)
    })
  }

  uploadScore(score, songId){
    var self = this
    $.ajax({
      url: '/scores.json',
      type: "POST",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      data: {score: {score: score, song_id: songId}}
    })
    .done(function(data){
      self.getScores()
    })
  }

  gameComplete(score) {
    // Ajax score to leaderboard database
    // Display navbar
    // Play theme tune
    this.uploadScore(score.currentScore, this.songData['id'])
  }
}

export default GameController
