class HomepageController < ApplicationController
  skip_before_action :require_login


  def index
    session[:user_id]
    @song = Song.new
  end
end
