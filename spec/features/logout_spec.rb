require 'rails_helper'

feature 'user can login', js: true do
  scenario 'user clicks logout and can see the sign up/ log in page', driver: :selenium_chrome_headless do
    User.create(username: 'Imraan', email: 'imraan21@hotmail.co.uk', password: 'securepass1')
    visit '/'
    click_button "Login"
    fill_in 'login[email]', with: 'imraan21@hotmail.co.uk'
    fill_in 'login[password]', with: 'securepass1'
    click_button 'Sign in'
    click_button 'Logout'

    expect(page).not_to have_button "Logout"
    expect(page).to have_button "Signup"
  end
end
