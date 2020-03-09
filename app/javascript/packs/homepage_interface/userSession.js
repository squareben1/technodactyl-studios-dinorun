let windowObjectReference = null;
let previousUrl = null;

const receiveMessage = event => {
  console.log('in receive event')
  // check origin
  if (event.origin !== window.location.origin) {
    return;
  }
  // if we trust the sender and the source is our popup
  console.log(event)
  registerUser()
}

const openSignInWindow = (url, name) => {
  // remove any existing event listeners
  window.removeEventListener('message', receiveMessage)

  // window features
  const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100'

  // Ensure mutliple clicks redirect to already opened page
  if (windowObjectReference === null || windowObjectReference.closed) {
    windowObjectReference = window.open(url, name, strWindowFeatures)
  } 
  else if (previousUrl !== url) {
    windowObjectReference = window.open(url, name, strWindowFeatures);
    windowObjectReference.focus();
  } 
  else {
    windowObjectReference.focus();
  }

  // add the listener for receiving a message from the popup
  window.addEventListener('message', event => receiveMessage(event), false);

  // assign the previous URL
  previousUrl = url;
}

function registerUser() {
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
        $("#logged-out").hide()
        $("#logged-in").show()
      } else {
        userMessage.innerHTML = ''
        for (const message in data.error_message) {
          userMessage.innerHTML += data.error_message[message][0] + '<br>'
        }
      }
    })
  }
}

function signup(event) {
  event.preventDefault()
  var register_with_spotify = document.getElementById("register[spotify]").checked
  if (register_with_spotify == true) {
    openSignInWindow('/connect_with_spotify', 'Spotify')
  }
  else {
    registerUser()
  }
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
