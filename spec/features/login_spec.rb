require 'rails_helper'

feature 'user can login', js: true do
  scenario 'user clicks login and fills in form', driver: :selenium_chrome_headless do
    User.create(username: 'Imraan', email: 'imraan21@hotmail.co.uk', password: 'securepass1')
    visit '/'
    click_button "Login"
    fill_in 'login[email]', with: 'imraan21@hotmail.co.uk'
    fill_in 'login[password]', with: 'securepass1'
    click_button 'Sign in'
    expect(page).to have_content 'Imraan welcome back to DinoRun!'
  end

  scenario 'user clicks login and fills in form', driver: :selenium_chrome_headless do
    visit '/'
    click_button "Login"
    fill_in 'login[email]', with: 'imraan21@hotmail.co.uk'
    fill_in 'login[password]', with: 'securepass1'
    click_button 'Sign in'
    expect(page).to have_content 'Email or password is not correct!'
  end
end