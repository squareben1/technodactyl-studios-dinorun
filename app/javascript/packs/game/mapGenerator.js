function generateMapFromAmplitudeArray(amplitudeArray) {
  var result = []
  var max = Math.max(...amplitudeArray)
  var min = Math.min(...amplitudeArray)
  var range = max - min
  for (var i = 0; i < amplitudeArray.length; i++){ 
    if (amplitudeArray[i] >= max - (range/4) && i % 2 == 0) {
      result.push(1)
    } else if (amplitudeArray[i] <= min + (range/4) && i % 2 == 0){
      result.push(2)
    }
    else {
      result.push(0)
    }
  }
  console.log("result", result)
  return result
}
  
export { generateMapFromAmplitudeArray }