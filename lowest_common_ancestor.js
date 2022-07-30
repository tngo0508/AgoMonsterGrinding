/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

 var lowestCommonAncestor = function(root, p, q) {
    let res = null;
    function dfs(root, p, q) {
        if (!root) return false;
        let mid = root === p || root === q;
        let left = dfs(root.left, p, q);
        let right = dfs(root.right, p, q);

        if (mid + left + right >= 2) {
            res = root; 
            return true;
        }

        return mid || left || right;
    }
    dfs(root, p, q);
    return res;
};