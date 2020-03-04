class Song < ApplicationRecord
  has_one_attached :mp3
  validates :mp3, presence: true
end
