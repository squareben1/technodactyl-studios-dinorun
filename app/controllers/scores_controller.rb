class ScoresController < ApplicationController
  def create
    score = Score.new(score_params)
    score.user_id = session[:user_id]

    if score.valid?
      score.save
      render json: {score: "saved"}
    else
      render json: {score: "not saved"}
    end
  end

  def show
    top_three = Score.where(song_id: params[:id]).order(score: :desc).first(3)
    render json: top_three.map{ |score| {score: score.score, username: score.user.username}}
  end

  private

  def score_params
    params.require(:score).permit(:score, :song_id)
  end
end
