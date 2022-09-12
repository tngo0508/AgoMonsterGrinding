/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  function backtrack(start, candidates, target, curr, res, currSum) {
    if (start >= candidates.length || currSum === target) {
      res.push([...curr]);
      return;
    }
    for (let i = start; i < candidates.length; ++i) {
      currSum += candidates[i];
      if (currSum <= target) {
        curr.push(candidates[i]);
        backtrack(start, candidates.slice(i), target, curr, res, currSum);
        curr.pop();
      }
      currSum -= candidates[i];
    }
  }
  const res = [];
  backtrack(0, candidates, target, [], res, 0);
  return res;
};

// algomonster solution
function combinationSum(candidates, target) {
  function dfs(nums, start, remaining, path) {
    if (remaining == 0) {
      res.push([...path]);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      const num = nums[i];
      if (remaining - num < 0) continue;
      path.push(num);
      dfs(nums, i, remaining - num, path);
      path.pop();
    }
  }
  res = [];
  dfs(candidates, 0, target, []);
  return res;
}
