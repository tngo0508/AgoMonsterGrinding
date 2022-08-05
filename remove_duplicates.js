/**
 * @param {number[]} nums
 * @return {number}
 */
 var removeDuplicates = function(nums) {
    let start = 0;
    for (let end = 0; end < nums.length; ++end) {
      if (nums[start] != nums[end]) {
        ++start;
        nums[start] = nums[end];
      }
    }
    return start + 1;
  };