window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQC-sZERWsYVzhAtXEaeNeZNw7FTQFO57CIurGMULEzrL60J0Y_jbc0khfjMES2DpPUE5XiC5ZXQ6Jo0XVrukfQD541EFbWrxsB_UV01PVjEHNJHfh7vf35H-mkjBTtarpP0038rl1DVDIs7qCqLVIUej-veq_pihRc';
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });

  // Play
  const play = ({
    spotify_uri,
    playerInstance: {
      _options: {
        getOAuthToken,
        id
      }
    }
  }) => {
    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });
    });
  };

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id)
    var trackUrl = 'spotify:track:6yismmdmRHNsfTufirziX0'
    var trackId = '6yismmdmRHNsfTufirziX0'
    play({
      spotify_uri: trackUrl,
      playerInstance: player
    });
    $.ajax({
      url: `https://api.spotify.com/v1/audio-features/${trackId}`,
      type: "GET",
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + token );},
      success: function(data) {
        console.log(data.tempo)
      }
    });
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();
};