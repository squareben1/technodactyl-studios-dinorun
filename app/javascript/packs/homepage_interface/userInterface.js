var showLogInForm = function(){
  $("#login-form").toggle()
}


window.addEventListener('load', function(){
  $('#login').click(showLogInForm)
})