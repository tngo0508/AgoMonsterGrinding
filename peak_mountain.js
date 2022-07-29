/**
 * @param {number[]} nums
 * @return {number}
 */
 var findPeakElement = function(nums) {
    let l = 0, r = nums.length - 1;
    let n = nums.length;
    let res = n - 1;
    while (l <= r) {
        let m = l + Math.floor((r - l)/2);
        let left = (m + 1 < n) ? nums[m + 1] : Number.NEGATIVE_INFINITY;
        let right = (m - 1 >= 0) ? nums[m - 1] : Number.NEGATIVE_INFINITY;
        if (nums[m] > left && nums[m] > right) {
            return m;
        } else if (nums[m] > right) {
            res = l;
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return res;
};