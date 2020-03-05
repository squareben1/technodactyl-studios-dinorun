feature 'user can signup', js: true do
  scenario 'user clicks signup and fills in form to signup', driver: :selenium_chrome_headless do
    visit '/'
    click_button "Signup"
    fill_in 'username', with: 'Imraan'
    fill_in 'email', with: 'imraan21@hotmail.co.uk'
    fill_in 'password', with: 'securepass1'
    click_button 'Register'
    expect(page).to have_content 'Welcome Imraan to DinoRun!'
  end
end
