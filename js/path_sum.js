/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  function dfs(node, target) {
    if (!node) return false;

    target -= node.val;

    if (!node.left && !node.right) {
      return target === 0;
    }

    let l = dfs(node.left, target);
    let r = dfs(node.right, target);
    return l || r;
  }

  return dfs(root, targetSum);
};
