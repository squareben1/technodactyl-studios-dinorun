class SongAnalyser{
  setup() {
    var song = this
    var audio_file = document.getElementById("song_mp3");
    audio_file.onchange = function() {
      if (audio_file.value == '') {
        return ''
      }
      song.hideCreateSongButton()
      song.displayProgressBar()
      var file = this.files[0];
      song_title.value = file.name;
      var reader = new FileReader();
      var context = new (window.AudioContext || window.webkitAudioContext)();
      reader.onload = function() {
        context.decodeAudioData(reader.result, function(buffer) {
          song.json(buffer); 
        });
      };
      reader.readAsArrayBuffer(file);
    };
  }

  //// getting both amplitude array and bpm of the audio file
  json(buffer) {
    var offlineContext = new OfflineAudioContext(
      1,
      buffer.length,
      buffer.sampleRate
    );
    var source = offlineContext.createBufferSource();
    source.buffer = buffer;
    var filter = offlineContext.createBiquadFilter();
    filter.type = "lowpass";
    source.connect(filter);
    filter.connect(offlineContext.destination);
    source.start(0);
    self = this;

    offlineContext.startRendering().then(function(lowPassAudioBuffer) {
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var song = audioCtx.createBufferSource();
      song.buffer = lowPassAudioBuffer;
      var songLength = song.buffer.duration
      song.connect(audioCtx.destination);
      var lowPassBuffer = song.buffer.getChannelData(0);

      /// Tempo
      var gettingTempo = self.getSampleClip(lowPassBuffer, 400);
      gettingTempo = self.normalizeArray(gettingTempo);
      var tempo = self.countFlatLineGroupings(gettingTempo);
      var finalTempo = tempo * 6;
      song_bpm.value = finalTempo;

      /// Volume Amplitude Array
      var amplitudeArray = self.slice(buffer, finalTempo, audioCtx);

      /// Frequency Array
      song_analysed.value = JSON.stringify(amplitudeArray);

      // Post completion
      self.showCreateSongButton()
    });
  }

  getSampleClip(data, samples) {
    var newArray = [];
    var modulus_coefficient = Math.round(data.length / samples);

    for (var i = 0; i < data.length; i++) {
      if (i % modulus_coefficient == 0) {
        newArray.push(data[i]);
      }
    }
    return newArray;
  }

  // return an array of amplitudes for the supplied `audioBuffer`
  // each item in the array will represent the average amplitude (in dB)
  // for a chunk of audio `bpm` seconds long
  slice(audioBuffer, bpm, context) {
    var channels = audioBuffer.numberOfChannels,
      sampleRate = context.sampleRate,
      len = audioBuffer.length,
      samples = Math.round(sampleRate * (60/bpm)),
      output = [],
      amplitude,
      values;
    // loop by chunks of `t` seconds
    for (let i = 0; i < len; i += samples ) {
      values = [];
      // loop through each sample in the chunk
      for (let j = 0; j < samples && j + i < len; ++j ) {
        amplitude = 0;
        // sum the samples across all channels
        for (let k = 0; k < channels; ++k ) {
          amplitude += audioBuffer.getChannelData(k)[i + j];
        }
        values.push(amplitude);
      }
      output.push(this.dB(values));
    }
    return output;
  }

  dB( buffer ) {
    var len = buffer.length, total = 0, i = 0, rms, db;
    while ( i < len ) {
      total += ( buffer[i] * buffer[i++] );
    }
    rms = Math.sqrt( total / len );
    db = 20 * ( Math.log(rms) / Math.LN10 );
    return db;
  }

  normalizeArray(data) {
    var newArray = [];

    for (var i = 0; i < data.length; i++) {
      newArray.push(Math.abs(Math.round((data[i + 1] - data[i]) * 1000)));
    }

    return newArray;
  }

  countFlatLineGroupings(data) {
    var newArray = this.normalizeArray(data);

    function getMax(a) {
      var m = -Infinity,
        i = 0,
        n = a.length;

      for (; i != n; ++i) {
        if (a[i] > m) {
          m = a[i];
        }
      }
      return m;
    }

    function getMin(a) {
      var m = Infinity,
        i = 0,
        n = a.length;

      for (; i != n; ++i) {
        if (a[i] < m) {
          m = a[i];
        }
      }
      return m;
    }

    var max = getMax(newArray);
    var min = getMin(newArray);
    var count = 0;
    var threshold = Math.round((max - min) * 0.2);

    for (var i = 0; i < newArray.length; i++) {
      if (
        newArray[i] > threshold &&
        newArray[i + 1] < threshold &&
        newArray[i + 2] < threshold &&
        newArray[i + 3] < threshold &&
        newArray[i + 6] < threshold
      ) {
        count++;
      }
    }

    return count;
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
