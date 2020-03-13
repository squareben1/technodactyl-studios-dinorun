
def log_in
  visit '/'
  click_button "Login"
  sleep(1)
  fill_in 'login[email]', with: 'imraan21@hotmail.co.uk'
  fill_in 'login[password]', with: 'securepass1'
  click_button 'Sign in'
end

def sign_up
  visit '/'
  click_button "Signup"
  sleep(1)
  fill_in 'register[username]', with: 'Imraan'
  fill_in 'register[email]', with: 'imraan21@hotmail.co.uk'
  fill_in 'register[password]', with: 'securepass1'
  click_button 'Register'
end