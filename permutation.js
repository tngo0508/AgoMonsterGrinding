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

//algomonster - my solution
function permutations(letters) {
    // WRITE YOUR BRILLIANT CODE HERE
    function backtrack(letters, curr, res) {
        if (curr.length === letters.length) {
            res.push([...curr].join(""));
            return;
        }
        for (let i = 0; i < letters.length; ++i) {
            if (curr.includes(letters[i])) continue;
            curr.push(letters[i]);
            backtrack(letters, curr, res);
            curr.pop();
        }
        
    }
    const res = [];
    backtrack(letters, [], res);
    return res;
}
//algomonster - solution
function permutations(letters) {
    function dfs(path, used, res) {
        if (path.length == letters.length) {
            return res.push(path.join(''));
        }
        for (let i = 0; i < letters.length; i++) {
            // skip used letters
            if (used[i]) continue;
            // add letter to permutation, mark letter as used
            path.push(letters[i]);
            used[i] = true;
            dfs(path, used, res);
            // remove letter from permutation, mark letter as unused
            path.pop();
            used[i] = false;
        }
    }
    const res = [];
    letters = [...letters];
    dfs([], new Array(letters.length).fill(false), res);
    return res;
}