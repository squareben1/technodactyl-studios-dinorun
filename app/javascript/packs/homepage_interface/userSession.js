var signup = function(event) {
  event.preventDefault()
  var isValid = document.getElementById("register-form").checkValidity()
  var username = document.getElementById("register[username]")
  var email = document.getElementById("register[email]")
  var password = document.getElementById("register[password]")
  if (isValid) {
  $.ajax({
    url: '/user.json',
    type: "POST",
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    data: {user: {username: username.value, password: password.value, email: email.value}}
  }).done(function( data ) {
    username.value = ""
    email.value = ""
    password.value = ""
    userMessage = document.getElementById("user-message")
    if (data['username']) {
      userMessage.innerHTML = data['username'] + ' welcome to DinoRun!'
    } else {
      userMessage.innerHTML = ''
      for (const message in data.error_message) {
        userMessage.innerHTML += data.error_message[message][0] + '<br>'
      }
    }
  })}
}

var login = function(event) {
  event.preventDefault()
  var email = document.getElementById("login[email]")
  var password = document.getElementById("login[password]")
  $.ajax({
    url: '/session.json',
    type: "POST",
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    data: {user: {password: password.value, email: email.value}}
  }).done(function( data ) {
    email.value = ""
    password.value = ""
    userMessage = document.getElementById("user-message")
    if (data['username']) {
      userMessage.innerHTML = data['username'] + ' welcome back to DinoRun!'
      $("#logged-out").hide()
      $("#logged-in").show()
    } else {
      userMessage.innerHTML = 'Email or password is not correct!'
    }
  })
}

var logout = function() {
  $.ajax({
    url: '/session.json',
    type: "DELETE",
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))}
  }).done(function( data ) {
    userMessage = document.getElementById("user-message")
    userMessage.innerHTML = ""
    $("#logged-out").show()
    $("#logged-in").hide()
  })
}

window.addEventListener('load', function(){
  document.getElementById('register[button]').addEventListener('click', signup)
  document.getElementById('login[button]').addEventListener('click', login)
  document.getElementById('logout').addEventListener('click', logout)


  $(document).ajaxComplete(function( event, xhr, settings ) {
    header_token = xhr.getResponseHeader('X-CSRF-Token')
    if (header_token) $('meta[name=csrf-token]').attr('content', header_token)
  })
})