function parseStringAsArray(str) {
  let arr;
  try {
    arr = JSON.parse(str)
    console.log()
  } catch {
    console.error(`${str} is invalid array`)
    arr = []
  }
  if (!Array.isArray(arr)) {
    return []
  }
  return arr
}

function fillByDefault(arr, defaultValue) {
  if (arr.length === 0) {
    return defaultValue;
  }
  return arr;
}

module.exports = {
  parseStringAsArray,
  fillByDefault
}
