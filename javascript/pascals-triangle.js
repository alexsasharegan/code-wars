/**
 * return a flat array representing the values of Pascal's Triangle to the n-th level
 * @param {number} n
 */
function pascalsTriangle(n) {
  return range(n).reduce((triangles, _, n) => {
    return triangles.concat(calcRowPascalsTriangle(n))
  }, [])
}

/**
 * @link https://math.stackexchange.com/a/1154968
 * @param {number} n
 */
function calcRowPascalsTriangle(n) {
  return range(n).reduce((row, _, k) => row.concat(row[k] * (n - k) / (k + 1)), [1])
}

function range(length) {
  return Array.from({ length })
}
