require 'rails_helper'
require './spec/features/web_helpers'

feature 'user can login', js: true do
  scenario 'user clicks login and fills in form', driver: :selenium_chrome_headless do
    User.create(username: 'Imraan', email: 'imraan21@hotmail.co.uk', password: 'securepass1')
    log_in
    expect(page).to have_content 'Imraan welcome back to DinoRun!'
  end

  scenario 'user clicks login and fills in form', driver: :selenium_chrome_headless do
    log_in
    expect(page).to have_content 'Email or password is not correct!'
  end

  scenario 'user logins and can see the music upload form', driver: :selenium_chrome_headless do
    User.create(username: 'Imraan', email: 'imraan21@hotmail.co.uk', password: 'securepass1')
    log_in
    expect(page).not_to have_button('Sign in')
    expect(page).to have_button('Logout')
    expect(page).to have_content 'Mp3'
  end
end
