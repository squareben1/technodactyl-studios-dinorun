
def sign_up
  visit '/'
  click_button "Login"
  fill_in 'login[email]', with: 'imraan21@hotmail.co.uk'
  fill_in 'login[password]', with: 'securepass1'
  click_button 'Sign in'
end