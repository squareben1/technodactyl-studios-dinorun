class Song < ApplicationRecord
  has_one_attached :mp3
  has_many :scores 
  validates :mp3, presence: true
  validates :title, uniqueness: true
  validates :analysed, uniqueness: true
end
