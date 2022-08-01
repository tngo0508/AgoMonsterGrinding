/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permute = function(nums) {
    function backtrack(nums, start, curr, res) {
        if (curr.length === nums.length) {
            res.push([...curr]);
            return
        }
        for (let i = start; i < nums.length; ++i) {
            if (curr.includes(nums[i])) {
                continue;
            }
            curr.push(nums[i]);
            backtrack(nums, start, curr, res);
            curr.pop();
        }
        
    }
    let res = []
    backtrack(nums, 0, [], res);
    return res;
};