class Score < ApplicationRecord
  has_one :user
  has_one :song

end
