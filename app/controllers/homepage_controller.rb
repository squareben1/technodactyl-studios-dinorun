class HomepageController < ApplicationController
  def index
    session[:id] = '20'
    session[:secret] = 'secret'
    p session
  end
end
