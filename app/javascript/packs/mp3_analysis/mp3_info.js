class SongAnalyser{
  setup() {
    var songAnalyser = this
    var audio_file = document.getElementById("song_mp3")
    audio_file.onchange = function() {
      if (audio_file.value == '') {
        return ''
      }
      songAnalyser.hideCreateSongButton()
      songAnalyser.displayProgressBar()
      var file = this.files[0]
      song_title.value = file.name
      var reader = new FileReader()
      var context = new (window.AudioContext || window.webkitAudioContext)()
      reader.onload = function() {
        context.decodeAudioData(reader.result, function(buffer) {
          songAnalyser.buffertoJSON(buffer)
        })
      }
      reader.readAsArrayBuffer(file)
    }
  }

  //// getting both amplitude array and bpm of the audio file
  buffertoJSON(buffer) {
    var offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate)
    var source = offlineContext.createBufferSource()
    source.buffer = buffer
    var filter = offlineContext.createBiquadFilter()
    filter.type = "lowpass"
    source.connect(filter)
    filter.connect(offlineContext.destination)
    self = this

    offlineContext.startRendering().then( function(lowPassAudioBuffer) {
      // Tempo
      var pcmData = lowPassAudioBuffer.getChannelData(0)
      var normalizedPCMData = self.normalizeArray(pcmData)
      var tempo = self.analyseTempo(normalizedPCMData, lowPassAudioBuffer.sampleRate)
      song_bpm.value = tempo

      // Amplitude Array
      var maxSampleAmplitude = self.bufferToMaxAmplitudePerBeat(lowPassAudioBuffer, tempo)
      maxSampleAmplitude = self.normalizeArray(maxSampleAmplitude)
      song_analysed.value = JSON.stringify(maxSampleAmplitude)

      // Post completion
      self.showCreateSongButton()
    })
    source.start()
  }

  normalizeArray(data) {
    var maxLow = 0
    for (var i = 0; i < data.length; i++) {
      if (data[i] < maxLow) {
        maxLow = data[i]
      }
    }
    maxLow = Math.abs(maxLow)

    var maxHigh = 0
    for (var i = 0; i < data.length; i++) {
      if (data[i] > maxHigh) {
        maxHigh = data[i]
      }
    }
    var max = (maxLow > maxHigh ? maxLow : maxHigh)

    var normalizedArray = []
    for (var i = 0; i < data.length; i++) {
      let value = Math.abs(data[i])
      normalizedArray.push(Math.round((value / max) * 1000))
    }
    return normalizedArray
  }

  analyseTempo(normalizedPCMData, sampleRate) {
    var peaksArray = this.getPeaksAtThreshold(normalizedPCMData, 750)
    var tempoCounts = this.countIntervalsBetweenNearbyPeaks(peaksArray, sampleRate)
    var tempo = tempoCounts.sort((a, b) => b.count - a.count)[0].tempo
    return tempo
  }

  getPeaksAtThreshold(data, threshold) {
    var peaksArray = []
    var length = data.length
    for(var i = 0; i < length; i++) {
      if (data[i] > threshold) {
        peaksArray.push(i)
        i += 10000
      }
    }
    return peaksArray
  }

  countIntervalsBetweenNearbyPeaks(peaksArray, sampleRate) {
    var tempoCounts = []
    peaksArray.forEach( function(peak, index) {
      for (var i = 0; i < 10; i++) {
        var interval = peaksArray[index + i] - peak
        if (Number.isNaN(interval) || interval == 0) {
          continue
        }
        var tempo = Math.round(60 / (interval / sampleRate))
        while (tempo < 70) tempo *= 2
        var foundTempo = tempoCounts.some( function(tempoCount) {
          if (tempoCount.tempo === tempo) {
            return tempoCount.count++
          }
        })
        if (!foundTempo) {
          tempoCounts.push({tempo: tempo, count: 1})
        }
      }
    })
    return tempoCounts
  }

  // return an array of amplitudes for the supplied `audioBuffer`
  bufferToMaxAmplitudePerBeat(audioBuffer, bpm) {
    var sampleSize = Math.round(audioBuffer.sampleRate * (60/bpm))
    var numChannels = audioBuffer.numberOfChannels
    var amplitudeArray = []

    // loop through each sample
    for (var i = 0; i < audioBuffer.length; i += sampleSize) {
      var maxSampleAmplitude = 0
      // loop through each value in sample
      for (let j = 0; j < sampleSize; j++) {
        let avgValueAmplitude = 0
        // sum the samples across all channels
        for (let k = 0; k < numChannels; k++) {
          avgValueAmplitude += audioBuffer.getChannelData(k)[i + j]
        }
        avgValueAmplitude /= numChannels
        if (maxSampleAmplitude < avgValueAmplitude) {
          maxSampleAmplitude = avgValueAmplitude
        }
      }
      amplitudeArray.push(maxSampleAmplitude)
      if (i + sampleSize > audioBuffer.length) {
        return amplitudeArray
      }
    }
  }

  showCreateSongButton() {
    $('#user-message').text('').hide()
    $('#create_song_btn').show("slide")
  }

  hideCreateSongButton() {
    $('#create_song_btn').hide()
  }

  displayProgressBar() {
    $('#user-message').text('Song analysis in progress').show()
  }
}

export default SongAnalyser
