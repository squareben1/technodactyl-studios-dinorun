function toggleLogInForm(){
  $("#login-form").toggle("slide")
}

function toggleSignUpForm() {
  $("#register-form").toggle("slide")
}

function toggleInstructions(){
  $("#instruction").toggle()
  $("#user-message").hide()
}

export { toggleLogInForm, toggleSignUpForm, toggleInstructions } 