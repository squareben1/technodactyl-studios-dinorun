function toggleLogInForm(){
  if ( $("#register-form").css('display') === 'block' ) {
    $("#register-form").toggle("slide")
  }
  $("#login-form").toggle("slide")
}

function toggleSignUpForm() {
  if ( $("#login-form").css('display') === 'block' ) {
    $("#login-form").toggle("slide")
  }
  $("#register-form").toggle("slide")
}

function toggleInstructions(){
  $("#instruction").toggle()
  $("#user-message").hide()
}

export { toggleLogInForm, toggleSignUpForm, toggleInstructions } 