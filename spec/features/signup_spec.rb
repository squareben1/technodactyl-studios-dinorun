require 'rails_helper'

feature 'user can signup', js: true do
  scenario 'user clicks signup and fills in form to signup', driver: :selenium_chrome_headless do
    visit '/'
    click_button "Signup"
    fill_in 'register[username]', with: 'Imraan'
    fill_in 'register[email]', with: 'imraan21@hotmail.co.uk'
    fill_in 'register[password]', with: 'securepass1'
    click_button 'Register'
    expect(page).to have_content 'Imraan welcome to DinoRun!'
  end

  scenario 'user can not sign up with an email already registered', driver: :selenium_chrome_headless do
    User.create(username: 'Imraan', email: 'imraan21@hotmail.co.uk', password: 'securepass1')
    visit '/'
    click_button "Signup"
    fill_in 'register[username]', with: 'Imraan'
    fill_in 'register[email]', with: 'imraan21@hotmail.co.uk'
    fill_in 'register[password]', with: 'securepass1'
    click_button 'Register'
    expect(page).to have_content 'Username or email are already taken!'
  end
end
