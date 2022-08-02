/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// trick is to use i + 1 to pass as the argument instead of start or start + 1
// review the permutation and combination sum to compare the ways how to traverse the tree path while backtracking
 var subsets = function(nums) {
    function backtrack(start, curr, res, nums) {
        if (start > nums.length) return;
        res.push([...curr]);
        for (let i = start; i < nums.length; ++i) {
            curr.push(nums[i]);
            backtrack(i + 1, curr, res, nums);
            curr.pop();
        }
    }
    const res = [];
    backtrack(0, [], res, nums);
    return res;
};

// algomonster solution
// idea: include and don't include
function subsets(nums) {
    const res = [];
    function dfs(i, cur) {
        if (i == nums.length) {
            res.push([...cur]);
            return;
        }
        cur.push(nums[i]);
        dfs(i + 1, cur);
        cur.pop();
        dfs(i + 1, cur);
    }
    dfs(0, []);
    return res;
}

// algomonster alternative approach
// apply pruning
function subsets(nums) {
    const res = [[]];
    function dfs(i, cur) {
        if (i == nums.length) {
            return;
        }
        cur.push(nums[i]);
        res.push([...cur]);
        dfs(i + 1, cur);
        cur.pop();
        dfs(i + 1, cur);
    }
    dfs(0, []);
    return res;
}