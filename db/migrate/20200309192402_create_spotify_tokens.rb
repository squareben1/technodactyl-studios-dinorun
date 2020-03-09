class CreateSpotifyTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :spotify_tokens do |t|
      t.string :access_token
      t.string :refresh_token
      t.date :expires
      t.string :scope
      t.timestamps
    end
  end
end
