function generateMapFromAmplitudeArray(amplitudeArray) {
  var result = []
  for (var i = 0; i < amplitudeArray.length; i++){ 
    if ((amplitudeArray[i] >= 750) && (i % 4 == 0)) {
      result.push(1)
    } else if ((amplitudeArray[i] >= 400) && (i % 2 == 0)) {
      result.push(2)
    }
    else if(Math.random() > 0.6) {
      result.push(3)
    } else{
      result.push(0)
    }
  }
  return result
}
  
export { generateMapFromAmplitudeArray }