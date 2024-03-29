/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root) {
    root.left = invertTree(root.left);
    root.right = invertTree(root.right);
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
  }
  return root;
};
