json.extract! song, :id, :title, :bpm, :analysed, :created_at, :updated_at
json.url song_url(song, format: :json)
