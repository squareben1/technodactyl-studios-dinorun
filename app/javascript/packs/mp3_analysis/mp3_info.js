window.addEventListener('load', function(){

  var audio_file = document.getElementById("song_mp3");

  audio_file.onchange = function() {
    var file = this.files[0];
    song_title.value = file.name;
    var reader = new FileReader();
    var context = new (window.AudioContext || window.webkitAudioContext)();
    reader.onload = function() {
      context.decodeAudioData(reader.result, function(buffer) {
        json(buffer);
        bpm(buffer);
      });
    };
    reader.readAsArrayBuffer(file);
  };

  function json(buffer) {
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
    offlineContext.startRendering().then(function(lowPassAudioBuffer) {
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var song = audioCtx.createBufferSource();
      song.buffer = lowPassAudioBuffer;
      song.connect(audioCtx.destination);
      window.lowPassBuffer = song.buffer.getChannelData(0);

      lowPassBuffer = getSampleClip(lowPassBuffer, 150);
      lowPassBuffer = normalizeArray(lowPassBuffer);
      lowPassBuffer = lowPassBuffer.filter(function(value) {
        return !Number.isNaN(value);
      });

      song_analysed.value = JSON.stringify(lowPassBuffer);
    });
  }

  function getSampleClip(data, samples) {
    var newArray = [];
    var modulus_coefficient = Math.round(data.length / samples);

    for (var i = 0; i < data.length; i++) {
      if (i % modulus_coefficient == 0) {
        newArray.push(data[i]);
      }
    }
    return newArray;
  }

  function normalizeArray(data) {
    var newArray = [];

    for (var i = 0; i < data.length; i++) {
      newArray.push(Math.abs(Math.round((data[i + 1] - data[i]) * 1000)));
    }

    return newArray;
  }

//////////////

  function bpm(buffer) {
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
    offlineContext.startRendering().then(function(lowPassAudioBuffer) {
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var song = audioCtx.createBufferSource();
      song.buffer = lowPassAudioBuffer;
      song.connect(audioCtx.destination);

      window.lowPassBuffer = song.buffer.getChannelData(0);

      // window.lowPassFilter = getClip(10, 10, lowPassBuffer)

      lowPassBuffer = getSampleClip(lowPassBuffer, 400);
      lowPassBuffer = normalizeArray(lowPassBuffer);
      var tempo = countFlatLineGroupings(lowPassBuffer);
      song_bpm.value = tempo * 6;
    });
  }

  function getClip(length, startTime, data) {
    var clip_length = length * 44100;
    var section = startTime * 44100;
    var newArr = [];

    for (var i = 0; i < clip_length; i++) {
      newArr.push(data[section + i]);
    }

    return newArr;
  }

  function countFlatLineGroupings(data) {
    var groupings = 0;
    var newArray = normalizeArray(data);

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
})