
def log_in
  visit '/'
  click_button "Login"
  fill_in 'login[email]', with: 'imraan21@hotmail.co.uk'
  fill_in 'login[password]', with: 'securepass1'
  click_button 'Sign in'
end

def sign_up
  visit '/'
  click_button "Signup"
  fill_in 'register[username]', with: 'Imraan'
  fill_in 'register[email]', with: 'imraan21@hotmail.co.uk'
  fill_in 'register[password]', with: 'securepass1'
  click_button 'Register'
end