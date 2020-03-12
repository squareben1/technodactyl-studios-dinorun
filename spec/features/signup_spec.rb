require 'rails_helper'
require './spec/features/web_helpers'

feature 'user can signup', js: true do

  scenario 'user needs to click signup to show the form', driver: :selenium_chrome_headless do
    visit '/'
    expect(page).not_to have_button("Register")
    click_button "Signup"
    expect(page).to have_button 'Register'
  end

  scenario 'user clicks signup and fills in form to signup and not to see sign up form', driver: :selenium_chrome_headless do
    sign_up
    expect(page).not_to have_button 'Register'
    expect(page).to have_button 'Logout'
  end

  scenario 'user clicks signup and fills in form to signup', driver: :selenium_chrome_headless do
    sign_up
    expect(page).to have_content 'Imraan welcome to DinoRun!'
  end

  scenario 'user can not sign up with an email already registered', driver: :selenium_chrome_headless do
    User.create(username: 'Imraan', email: 'imraan21@hotmail.co.uk', password: 'securepass1')
    visit '/'
    click_button "Signup"
    fill_in 'register[username]', with: 'Imraan'
    fill_in 'register[email]', with: 'imraan21@hotmail.co.uk'
    fill_in 'register[password]', with: 'sec'
    click_button 'Register'
    expect(page).to have_content 'Email already taken'
    expect(page).to have_content 'Username already taken'
    expect(page).to have_content 'at least 6'
  end
end
