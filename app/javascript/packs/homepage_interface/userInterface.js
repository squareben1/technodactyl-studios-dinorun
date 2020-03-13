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

function isDeviceTouch() {
  try {  
    document.createEvent("TouchEvent");  
    return true;  
  } catch (e) {  
    return false;  
  }
}

function touchOrWebInstructions() {
  var instructionsDiv = document.querySelector('#instruction')
  if (isDeviceTouch()) {
    instructionsDiv.innerHTML = `
    Tap the <strong>right side of the screen</strong> for jump.<br>
    Tap the <strong>left side of the screen</strong> to destroy crates floating on the air. Hit them for more points!<br> 
    You can't destroy stones on the ground. They are too hard for the dinosaur.<br>
    `
  } else {
    instructionsDiv.innerHTML = `
    Click <strong>Spacebar</strong> for jump.<br>
    Click <strong>d</strong> to destroy crates floating on the air. Hit them for more points!<br> 
    Click <strong>r</strong> once the game is over to open the song selector <br> 
    Click <strong>g</strong> once the game is over to quick replay the same song <br> 
    You can't destroy stones on the ground. They are too hard for the dinosaur.<br>
    `
  }
}

export { toggleLogInForm, toggleSignUpForm, toggleInstructions, touchOrWebInstructions } 