class AddSpotifyTokenToUser < ActiveRecord::Migration[6.0]
  def change
    add_reference :spotify_tokens, :user, index: true, foreign_key: true
  end
end
