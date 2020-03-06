require 'rails_helper'

feature 'user can login', js: true do
  scenario 'user needs to click login to show the form', driver: :selenium_chrome_headless do
    visit '/'
    expect(page).not_to have_button("Sign in")
    click_button "Login"
    expect(page).to have_button 'Sign in'
  end

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

  scenario 'user logins and can see the music upload form', driver: :selenium_chrome_headless do
    User.create(username: 'Imraan', email: 'imraan21@hotmail.co.uk', password: 'securepass1')
    visit '/'
    click_button "Login"
    fill_in 'login[email]', with: 'imraan21@hotmail.co.uk'
    fill_in 'login[password]', with: 'securepass1'
    click_button 'Sign in'

    expect(page).not_to have_button('Sign in')
    expect(page).to have_button('Logout')
    expect(page).to have_content 'Mp3'
  end
end
