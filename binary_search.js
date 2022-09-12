/**
 * binary search
 * @param {array} arr array of number
 * @param {number} target number target
 * @return {index} index or -1
 */
function binarySearch(arr, target) {
  // WRITE YOUR BRILLIANT CODE HERE
  let l = 0;
  let r = arr.length - 1;
  let m = 0;
  while (l <= r) {
    m = l + Math.floor((r - l) / 2);
    if (target === arr[m]) {
      return m;
    }
    if (target > arr[m]) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }
  return -1;
}

binarySearch([2, 8, 89, 120, 1000], 120);
