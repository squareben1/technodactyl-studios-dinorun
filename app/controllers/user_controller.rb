class UserController < ApplicationController
  skip_before_action :require_login
  
  def create
    user = User.new(user_params)
    if user.valid?
      user.save
      session[:user_id] = user.id
      render json: {logged_in: true, username: user.username}
    else
      render json: {logged_in: false, error_message: user.errors.messages}
    end
  end

  def show 
    user = User.find(params[:id])
    render json: user
  end 

  private 

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
