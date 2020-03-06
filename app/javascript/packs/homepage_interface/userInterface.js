var toggleLogInForm = function(){
  $("#login-form").toggle()
}

var toggleSignUpForm = function(){
  $("#register-form").toggle()
}

window.addEventListener('load', function(){
  $('#login').click(toggleLogInForm)
  $('#signup').click(toggleSignUpForm)
})