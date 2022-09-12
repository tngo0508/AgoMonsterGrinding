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
 * @return {number[][]}
 */
const levelOrder = function (root) {
  if (!root) return [];
  const queue = [root];
  const res = [];
  while (queue.length > 0) {
    const {length} = queue;
    const curr = [];
    for (let i = 0; i < length; ++i) {
      const node = queue.shift();
      if (node) {
        curr.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
    res.push([...curr]);
  }
  return res;
};

// algomonster solution
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function levelOrderTraversal(root) {
  const res = [];
  const queue = [root]; // at least one element in the queue to kick start bfs
  while (queue.length > 0) {
    // as long as there is element in the queue
    const n = queue.length; // number of nodes in current level, see explanation above
    const new_level = [];
    for (let i = 0; i < n; i++) {
      // dequeue each node in the current level
      const node = queue.shift();
      new_level.push(node.val);
      // enqueue non-null children
      for (const child of [node.left, node.right]) {
        if (child) queue.push(child);
      }
    }
    res.push(new_level);
  }
  return res;
}
