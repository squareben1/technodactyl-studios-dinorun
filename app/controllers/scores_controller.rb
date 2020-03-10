class ScoresController < ApplicationController
  def create
    score = Score.new(score_params)
    score.user_id = session[:user_id]

    if score.valid?
      score.save
      # p score.as_json(include: :user)
      render json: {score: "saved"}
    else
      render json: {score: "not saved"}
    end
  end

  def show
    top_three = Score.where(song_id: params[:id]).order(score: :desc).first(3)
    render json: {
      first: {score: top_three[0].score, username: top_three[0].user.username},
      second: {score: top_three[1].score, username: top_three[1].user.username},
      third: {score: top_three[2].score, username: top_three[2].user.username}
    }
    render js: {}
  end

  private

  def score_params
    params.require(:score).permit(:score, :song_id)
  end
end
