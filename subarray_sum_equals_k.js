/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// prefix sum
 var subarraySum = function(nums, k) {
    let res = 0;
    let currSum = 0;
    let seen = new Map();
    seen.set(0, 1);
    for (let i = 0; i < nums.length; ++i) {
      currSum += nums[i];
      const comp = currSum - k;
      if (seen.has(comp)) {
        res += seen.get(comp);
      }
      seen.set(currSum, (seen.get(currSum) || 0) + 1);
    }
    return res;
  };

// algomonster solution
function subarraySum(arr, target) {
    // prefix_sum 0 happens when we have an empty array
    const prefixSums = new Map([[0, 0]]);
    let curSum = 0;
    for (let i = 0; i < arr.length; i++) {
        curSum += arr[i];
        const complement = curSum - target;
        if (prefixSums.has(complement)) {
            return [prefixSums.get(complement), i + 1];
        }
        prefixSums.set(curSum, i + 1);
    }
}