require 'rails_helper'
require './spec/features/web_helpers'

feature 'user can login', js: true do
  scenario 'user clicks logout and can see the sign up/ log in page', driver: :selenium_chrome_headless do
    User.create(username: 'Imraan', email: 'imraan21@hotmail.co.uk', password: 'securepass1')
    log_in
    click_button 'Logout'
    expect(page).not_to have_button "Logout"
    expect(page).to have_button "Signup"
  end
end
