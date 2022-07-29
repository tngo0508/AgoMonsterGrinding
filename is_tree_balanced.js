/**
 * Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as:

a binary tree in which the left and right subtrees of every node differ in height by no more than 1.

 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
 let maxDepth = function(node) {
    if (!node) {
        return 0;
    }
    let depth = 0;
    let left = maxDepth(node.left);
    let right = maxDepth(node.right);
    depth = Math.max(left, right) + 1;
    return depth;
    
};

var isBalanced = function(root) {
    if (!root) return true;
    let L = maxDepth(root.left);
    let R = maxDepth(root.right);
    return Math.abs(L - R) <= 1 && isBalanced(root.left) && isBalanced(root.right);
};