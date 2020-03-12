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
require("packs/game/crate")
require("packs/game/dino")
require("packs/game/score")
require("packs/game/renderGame")
require("packs/game/gameController")

// Spotify Packs
require("packs/spotify/spotify")

// Homepage Interface Packs
require("packs/homepage_interface/songSelector")
require("packs/homepage_interface/userSession")
require("packs/homepage_interface/userInterface")

// mp3 Analysis Packs
require("packs/mp3_analysis/mp3_info")


import GameController from './game/gameController.js'
import SongAnalyser from './mp3_analysis/mp3_info.js'
import { updateSongList, getSong } from './homepage_interface/songSelector.js'
import { toggleLogInForm, toggleSignUpForm } from './homepage_interface/userInterface.js'


// Load Page => new game
window.addEventListener('load', function() {
  var gameController
  var songAnalyser
  var userMessageDiv = document.querySelector('#user-message')
  
  gameController = new GameController
  gameController.setupGame()

  songAnalyser = new SongAnalyser
  songAnalyser.setup()

  updateSongList()

  // Event listner for when form submitted, refactor by changing form to AJAX submit and performing the below in a callback
  // Option to use ActionCable to automatically push new songs to the songList
  document.querySelector('#create_song_btn').addEventListener('click', function() {
    document.querySelector('#create_song_btn').style.display = 'none'
    setTimeout(function() {
      updateSongList()
      document.querySelector("#song_mp3").value = ""
    }, 1000)
  })

  document.querySelector('#start_game_btn').addEventListener('click', function() {
    getSong(function(data, audio) {
      userMessageDiv.innerHTML = ''
      gameController.startGame(data, audio)
    })
  })

  // Signup and Login
  document.querySelector('#login').addEventListener('click', toggleLogInForm)
  document.querySelector('#signup').addEventListener('click', toggleSignUpForm)

  
  document.body.addEventListener("ajax:success", function(event) {
    userMessageDiv.innerHTML = "The Song is successfully analysed. Enjoy the game"
  })
  document.body.addEventListener("ajax:error", function(event) {  
    userMessageDiv.innerHTML = "Song exists mate. Pick the song from the list below"
  })


  //=================================================================================
  //                           Spotify
  //=================================================================================

  // from spotify web api it shouldn't be here
  var SpotifyWebApi = (function() {
    var _baseUri = 'https://api.spotify.com/v1';
    var _baseTokenUri = 'https://spotify-web-api-token.herokuapp.com';
    var _accessToken = null;

    var _promiseProvider = function(promiseFunction) {
      return new window.Promise(promiseFunction);
    };

    var _checkParamsAndPerformRequest = function(requestData, options, callback) {
      var opt = {};
      var cb = null;

      if (typeof options === 'object') {
        opt = options;
        cb = callback;
      } else if (typeof options === 'function') {
        cb = options;
      }
      _extend(requestData.params, opt);
      return _performRequest(requestData, cb);
    };

    var _performRequest = function(requestData, callback) {
      var promiseFunction = function(resolve, reject) {
        var req = new XMLHttpRequest();
        var type = requestData.type || 'GET';
        if (type === 'GET') {
          req.open(type,
            _buildUrl(requestData.url, requestData.params),
            true);
        } else {
          req.open(type, _buildUrl(requestData.url));
        }
        if (_accessToken) {
          req.setRequestHeader('Authorization', 'Bearer ' + _accessToken);
        }
        req.onreadystatechange = function() {
          if (req.readyState === 4) {
            var data = null;
            try {
              data = req.responseText ? JSON.parse(req.responseText) : '';
            } catch (e) {}

            if (req.status === 200 || req.status === 201) {
              if (resolve) {
                resolve(data);
              }
              if (callback) {
                callback(null, data);
              }
            } else {
              if (reject) {
                reject(req);
              }
              if (callback) {
                callback(req, null);
              }
            }
          }
        };

        if (type === 'GET') {
          req.send(null);
        } else {
          req.send(JSON.stringify(requestData.postData));
        }
      };

      if (callback) {
        promiseFunction();
        return null;
      } else {
        return _promiseProvider(promiseFunction);
      }
    };

    var _extend = function() {
      var args = Array.prototype.slice.call(arguments);
      var target = args[0];
      var objects = args.slice(1);
      target = target || {};
      for (var i = 0; i < objects.length; i++) {
        for (var j in objects[i]) {
          target[j] = objects[i][j];
        }
      }
      return target;
    };

    var _buildUrl = function(url, parameters){
      var qs = '';
      for (var key in parameters) {
        if (parameters.hasOwnProperty(key)) {
          var value = parameters[key];
          qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        }
      }
      if (qs.length > 0){
        qs = qs.substring(0, qs.length - 1); //chop off last '&'
        url = url + '?' + qs;
      }
      return url;
    };

    var Constr = function() {};

    Constr.prototype = {
      constructor: SpotifyWebApi
    };

    /**
    * Sets the access token to be used.
    * See [the Authorization Guide](https://developer.spotify.com/web-api/authorization-guide/) on
    * the Spotify Developer site for more information about obtaining an access token.
    * @param {string} accessToken The access token
    * @return {void}
    */
    Constr.prototype.setAccessToken = function(accessToken) {
      _accessToken = accessToken;
    };

    /**
    * Fetches tracks from the Spotify catalog according to a query.
    * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
    * the Spotify Developer site for more information about the endpoint.
    * @param {Object} options A JSON object with options that can be passed
    * @param {function(Object, Object)} callback An optional callback that receives 2 parameters. The first
    * one is the error object (null if no error), and the second is the value if the request succeeded.
    * @return {Object} Null if a callback is provided, a `Promise` object otherwise
    */
    Constr.prototype.searchTracks = function(query, options, callback) {
      var requestData = {
        url: _baseUri + '/search/',
        params: {
          q: query,
          type: 'track'
        }
      };
      return _checkParamsAndPerformRequest(requestData, options, callback);
    };

    /**
    * Get audio features for a single track identified by its unique Spotify ID.
    * See [Get Audio Features for a Track](https://developer.spotify.com/web-api/get-audio-features/) on
    * the Spotify Developer site for more information about the endpoint.
    * @param {string} trackId The id of the track. If you know the Spotify URI it is easy
    * to find the track id (e.g. spotify:track:<here_is_the_track_id>)
    * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
    * one is the error object (null if no error), and the second is the value if the request succeeded.
    * @return {Object} Null if a callback is provided, a `Promise` object otherwise
    */
    Constr.prototype.getAudioFeaturesForTrack = function(trackId, callback) {
      var requestData = {
        url: _baseUri + '/audio-features/' + trackId
      };
      return _checkParamsAndPerformRequest(requestData, {}, callback);
    };

    /**
    * Obtains a token to be used against the Spotify Web API
    */
    Constr.prototype.getToken = function(callback) {
      var requestData = {
        url: _baseTokenUri + '/token'
      };
      return _checkParamsAndPerformRequest(requestData, {}, callback);
    };

    return Constr;
  })();


  //=================================================================================
  //                           script
  //=================================================================================
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.getToken().then(function(response) {
    spotifyApi.setAccessToken(response.token);
  });
  var queryInput = document.querySelector("#query"),
  result = document.querySelector("#result"),
  text = document.querySelector("#text"),
  audioTag = document.querySelector("#audio"),
  playButton = document.querySelector("#play");

function updateProgressState() {
  if (audioTag.paused) {
    return;
  }
  var progressIndicator = document.querySelector("#progress");
  if (progressIndicator && audioTag.duration) {
    progressIndicator.setAttribute(
      "x",
      (audioTag.currentTime * 100) / audioTag.duration + "%"
    );
  }
  requestAnimationFrame(updateProgressState);
}

audioTag.addEventListener("play", updateProgressState);
audioTag.addEventListener("playing", updateProgressState);

function updatePlayLabel() {
  playButton.innerHTML = audioTag.paused ? "Play track" : "Pause track";
}

audioTag.addEventListener("play", updatePlayLabel);
audioTag.addEventListener("playing", updatePlayLabel);
audioTag.addEventListener("pause", updatePlayLabel);
audioTag.addEventListener("ended", updatePlayLabel);

playButton.addEventListener("click", function() {
  if (audioTag.paused) {
    audioTag.play();
  } else {
    audioTag.pause();
  }
});

result.style.display = "none";

function getPeaks(data) {
  // What we're going to do here, is to divide up our audio into parts.

  // We will then identify, for each part, what the loudest sample is in that
  // part.

  // It's implied that that sample would represent the most likely 'beat'
  // within that part.

  // Each part is 0.5 seconds long - or 22,050 samples.

  // This will give us 60 'beats' - we will only take the loudest half of
  // those.

  // This will allow us to ignore breaks, and allow us to address tracks with
  // a BPM below 120.

  var partSize = 22050,
    parts = data[0].length / partSize,
    peaks = [];

  for (var i = 0; i < parts; i++) {
    var max = 0;
    for (var j = i * partSize; j < (i + 1) * partSize; j++) {
      var volume = Math.max(Math.abs(data[0][j]), Math.abs(data[1][j]));
      if (!max || volume > max.volume) {
        max = {
          position: j,
          volume: volume
        };
      }
    }
    peaks.push(max);
  }

  // We then sort the peaks according to volume...

  peaks.sort(function(a, b) {
    return b.volume - a.volume;
  });

  // ...take the loundest half of those...

  peaks = peaks.splice(0, peaks.length * 0.5);

  // ...and re-sort it back based on position.

  peaks.sort(function(a, b) {
    return a.position - b.position;
  });

  return peaks;
}

function getIntervals(peaks) {
  // What we now do is get all of our peaks, and then measure the distance to
  // other peaks, to create intervals.  Then based on the distance between
  // those peaks (the distance of the intervals) we can calculate the BPM of
  // that particular interval.

  // The interval that is seen the most should have the BPM that corresponds
  // to the track itself.

  var groups = [];

  peaks.forEach(function(peak, index) {
    for (var i = 1; index + i < peaks.length && i < 10; i++) {
      var group = {
        tempo: (60 * 44100) / (peaks[index + i].position - peak.position),
        count: 1
      };

      while (group.tempo < 90) {
        group.tempo *= 2;
      }

      while (group.tempo > 180) {
        group.tempo /= 2;
      }

      group.tempo = Math.round(group.tempo);

      if (
        !groups.some(function(interval) {
          return interval.tempo === group.tempo ? interval.count++ : 0;
        })
      ) {
        groups.push(group);
      }
    }
  });
  return groups;
}

document.querySelector("#spotify-search").addEventListener("submit", function(formEvent) {

  formEvent.preventDefault();
  result.style.display = "none";
  spotifyApi
    .searchTracks(queryInput.value.trim(), { limit: 1 })
    .then(function(results) {
      var track = results.tracks.items[0];
      var previewUrl = track.preview_url;
      audioTag.src = track.preview_url;
      console.log("track",track.name)
      // input
      song_title.value = track.name
      song_spotify_url.value = track.preview_url;
      var request = new XMLHttpRequest();
      request.open("GET", previewUrl, true);
      request.responseType = "arraybuffer";
       // Create offline context
      var context =
          new (window.AudioContext || window.webkitAudioContext)();
      request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
          var offlineContext = new OfflineAudioContext(2, buffer.length, buffer.sampleRate);
          // Create buffer source
          var source = offlineContext.createBufferSource();
          source.buffer = buffer;

          // Beats, or kicks, generally occur around the 100 to 150 hz range.
          // Below this is often the bassline.  So let's focus just on that.

          // First a lowpass to remove most of the song.

          var lowpass = offlineContext.createBiquadFilter();
          lowpass.type = "lowpass";
          lowpass.frequency.value = 400;
          lowpass.Q.value = 1;

          // Run the output of the source through the low pass.

          source.connect(lowpass);

          // Now a highpass to remove the bassline.

          var highpass = offlineContext.createBiquadFilter();
          highpass.type = "highpass";
          highpass.frequency.value = 100;
          highpass.Q.value = 1;

          // Run the output of the lowpass through the highpass.

          lowpass.connect(highpass);

          // Run the output of the highpass through our offline context.

          highpass.connect(offlineContext.destination);

          // Start the source, and render the output into the offline conext.

          source.start(0);
          offlineContext.startRendering();
          // self = this
          offlineContext.oncomplete = function(e) {
            var buffer = e.renderedBuffer;
            var peaks = getPeaks([
              buffer.getChannelData(0),
              buffer.getChannelData(1)
            ]);
            var groups = getIntervals(peaks);

            var svg = document.querySelector("#svg");
            svg.innerHTML = "";
            var svgNS = "http://www.w3.org/2000/svg";
            var rect;
            peaks.forEach(function(peak) {
              rect = document.createElementNS(svgNS, "rect");
              rect.setAttributeNS(
                null,
                "x",
                (100 * peak.position) / buffer.length + "%"
              );
              rect.setAttributeNS(null, "y", 0);
              rect.setAttributeNS(null, "width", 1);
              rect.setAttributeNS(null, "height", "100%");
              svg.appendChild(rect);
            });

            rect = document.createElementNS(svgNS, "rect");
            rect.setAttributeNS(null, "id", "progress");
            rect.setAttributeNS(null, "y", 0);
            rect.setAttributeNS(null, "width", 1);
            rect.setAttributeNS(null, "height", "100%");
            svg.appendChild(rect);

            svg.innerHTML = svg.innerHTML; // force repaint in some browsers

            var top = groups
              .sort(function(intA, intB) {
                return intB.count - intA.count;
              })
              .splice(0, 5);

            text.innerHTML =
              '<div id="guess">Guess for track <strong>' +
              track.name +
              "</strong> by " +
              "<strong>" +
              track.artists[0].name +
              "</strong> is <strong>" +
              Math.round(top[0].tempo) +
              " BPM</strong>" +
              " with " +
              top[0].count +
              " samples.</div>";

            text.innerHTML +=
              '<div class="small">Other options are ' +
              top
                .slice(1)
                .map(function(group) {
                  return group.tempo + " BPM (" + group.count + ")";
                })
                .join(", ") +
              "</div>";

            var printENBPM = function(tempo) {
              text.innerHTML +=
                '<div class="small">The tempo according to Spotify is ' +
                tempo +
                " BPM</div>";
            };
            spotifyApi
              .getAudioFeaturesForTrack(track.id)
              .then(function(audioFeatures) {
                printENBPM(audioFeatures.tempo);
              });

            result.style.display = "block";
          };
        });      
      };
      request.send();
    });
});


})