/**
 * @param {number[]} arr
 */
function moveZeros(arr) {
  let i = -1,
    zCnt = 0
  while (~(i = arr.indexOf(0))) {
    zCnt++
    arr.splice(i, 1)
  }
  return arr.concat(Array.from({ length: zCnt }).fill(0))
}
