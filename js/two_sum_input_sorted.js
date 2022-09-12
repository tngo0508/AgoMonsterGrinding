/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(numbers, target) {
    let l = 0, r = numbers.length - 1;
    while (l < r) {
      let currSum = numbers[l] + numbers[r];
      if (currSum === target) return [l + 1, r + 1];
      else if ( currSum > target) r -= 1;
      else l += 1;
    }
  };