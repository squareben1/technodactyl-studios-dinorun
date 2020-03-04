class SessionController < ApplicationController
  skip_before_action :require_login

  def create
    # check credentials
    user = User.find_by(email: user_params[:email])
    if user && user.authenticate(user_params[:password])
      # reset_session #reduce risk of session fixation
      session[:user_id] = user.id
      render json: {logged_in: true}
    else
      render json: {logged_in: false, message: 'Login not found'}
    end
  end

  def destroy
    # Log user out
    # reset_session #reduce risk of session fixation
    session[:user_id] = nil
    render json: {logged_in: false, message: 'You have been logged out'}
  end

  private 

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
