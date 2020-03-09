function generateBlocksFromFrequencyArray(frequencyArray) {
  return frequencyArray.map(function(frequency) {
    if (frequency >= 250) {
      return 1
    }
    else {
      return 0
    }
  })
}

export { generateBlocksFromFrequencyArray }