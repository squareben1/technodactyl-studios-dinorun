require 'active_support/all'
require 'net/http'
require 'json'

class SpotifyTokenController < ApplicationController
  skip_before_action :require_login
  def authorise
    state = SecureRandom.base64(16).gsub("/","_").gsub(/=+$/,"")
    session[:state] = state
    client_id = ENV['SPOTIFY_ID']
    client_secret = ENV['SPOTIFY_SECRET']
    scope = 'playlist-read-private%20user-modify-playback-state%20user-read-playback-state%20user-read-currently-playing%20streaming'
    redirect_uri = "http://localhost:3000/spotify_callback"
    redirect_to("https://accounts.spotify.com/authorize?client_id=#{client_id}&response_type=code&client_secret=#{client_secret}&scope=#{scope}&redirect_uri=#{redirect_uri}&state=#{state}")
  end

  def spotify_callback
    if session[:state] == params['state']
      token_hash = token_request(params['code'])
      # create new spotify token object and assign to user_id of session_cookie
      SpotifyToken.create(access_token: token_hash['access_token'], refresh_token: token_hash['refresh_token'], expires: Time.now + token_hash['expires_in'], scope: token_hash['scope'], user_id:  session[:user_id])
      user = User.find_by(id: session[:user_id])
      @username = user.username
    else 
      raise ActionController::RoutingError.new('Not Found')
    end
  end

  private

  def token_request(code)
    redirect_uri = "http://localhost:3000/spotify_callback"
    form_data = URI.encode_www_form(
      'grant_type' => 'authorization_code',
      'code' => code, 
      'redirect_uri' => redirect_uri,
      'client_id' => ENV['SPOTIFY_ID'],
      'client_secret' => ENV['SPOTIFY_SECRET'] 
    )
    response = Faraday.post("https://accounts.spotify.com/api/token") do |request|
      request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      request.body = form_data
    end
    JSON.parse(response.body)
  end
end
