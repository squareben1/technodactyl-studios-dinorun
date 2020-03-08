class SongAnalyser{

  setup(){
    var song = this
    var audio_file = document.getElementById("song_mp3");
    audio_file.onchange = function() {
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

  //// getting both frequency array and bpm of the audio file
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
      self = this
      offlineContext.startRendering().then(function(lowPassAudioBuffer) {
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var song = audioCtx.createBufferSource();
        song.buffer = lowPassAudioBuffer;
        songLength = song.buffer.duration
        song.connect(audioCtx.destination);
        window.lowPassBuffer = song.buffer.getChannelData(0);


        /// Tempo
        gettingTempo = self.getSampleClip(lowPassBuffer, 400);
        gettingTempo = self.normalizeArray(gettingTempo);
        var tempo = self.countFlatLineGroupings(gettingTempo);
        var finalTempo = tempo * 6;
        song_bpm.value = finalTempo;
        console.log("bpm", finalTempo)


        /// Frequency Array
        lowPassBuffer = self.getSampleClip(lowPassBuffer, finalTempo * songLength/60);
        lowPassBuffer = self.normalizeArray(lowPassBuffer);
        lowPassBuffer = lowPassBuffer.filter(function(value) {
          return !Number.isNaN(value);
        });
        console.log("buffer array", lowPassBuffer)
        song_analysed.value = JSON.stringify(lowPassBuffer);
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

  normalizeArray(data) {
    var newArray = [];

    for (var i = 0; i < data.length; i++) {
      newArray.push(Math.abs(Math.round((data[i + 1] - data[i]) * 1000)));
    }

    return newArray;
  }

  countFlatLineGroupings(data) {
    var groupings = 0;
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
}

export default SongAnalyser