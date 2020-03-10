class ScoresController < ApplicationController

  def create
    score = Score.new(score_params)
    if score.valid?
      score.save
      render json: {score: "score saved" }
    else
      render json: {score: "not saved"}
    end
  end

  def index
  end


  private

  def score_params
    params.require(:score).permit(:score, :user_id, :song_id)
  end



end
