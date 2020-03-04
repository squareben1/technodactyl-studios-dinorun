class UserController < ApplicationController
  def create
    puts 'params'
    p params
    # username, email, password
    @user = User.new(user_params)
    if @user.valid?
      @user.save
      session[:user_id] = @user.id
      render json: {logged_in: true}
    else
      render json: {logged_in: false}
    end
  end

  private 

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
