function generateBlocksFromAmplitudeArray(amplitudeArray) {
  return amplitudeArray.map(function(amplitude) {
    if (amplitude >= -15) {
      return 1
    }
    else {
      return 0
    }
  })
}

export { generateBlocksFromAmplitudeArray }