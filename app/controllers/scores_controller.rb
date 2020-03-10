class ScoresController < ApplicationController

  def create
    score = Score.new(score_params)
    score.user_id = session[:user_id]

    if score.valid?
      score.save
      p 'score'
      p score
      render json: {score: "score saved" }
    else
      render json: {score: "not saved"}
    end
  end

  def index
  end

  private

  def score_params
    params.require(:score).permit(:score, :song_id)
  end

end
