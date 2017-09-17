/**
 * You have to create a function that takes a positive integer number and returns the next bigger number formed by the same digits.
 * This algorithm finds the pivot point `i` where n[i] < n[i+1] (searching from right to left),
 * swaps that pivot value with the lowest value > n[i] in the subset n[i+1] - n[n.length-1],
 * and then sorts n[i+1] - n[n.length-1] to its lowest value before rendering the resulting number.
 * If the result is not greater than n, returns -1.
 * @param {number} n
 */
function nextBigger(n) {
  const dStr = n.toString()
  let pivotIdx = -1

  // From right to left, find pivot where i > i-1
  for (let i = dStr.length - 1; i > 0; i--) {
    if (+dStr[i] > +dStr[i - 1]) {
      pivotIdx = i - 1
      break
    }
  }

  if (pivotIdx === -1) {
    return -1
  }

  // Left of pivot
  const pLeft = dStr.slice(0, pivotIdx)
  // Right of pivot as array excluding pivot value
  const pRightAry = dStr.slice(pivotIdx + 1).split("")
  const pivotVal = +dStr[pivotIdx]

  // Find the lowest number in subsection > pivotVal
  let minIdx = null,
    minVal = null
  for (let i = 0; i < pRightAry.length; i++) {
    const curVal = +pRightAry[i]
    if (curVal > pivotVal) {
      if (minVal === null || minVal > curVal) {
        minIdx = i
        minVal = curVal
      }
    }
  }
  // Didn't find a number greater than pivot value
  if (minIdx === null) {
    return -1
  }
  // Swap our bigger number with the pivot value
  pRightAry[minIdx] = pivotVal
  // Sort ascending
  pRightAry.sort()
  const bigger = parseInt(pLeft + minVal + pRightAry.join(""), 10)

  return bigger > n ? bigger : -1
}
