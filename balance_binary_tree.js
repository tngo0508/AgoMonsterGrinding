class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function maxDepth(node) {
  if (!node) return 0;
  return Math.max(maxDepth(node.left), maxDepth(node.right)) + 1;
}

function isBalanced(tree) {
  // WRITE YOUR BRILLIANT CODE HERE
  if (!tree) return true;
  let L = maxDepth(tree.left);
  let R = maxDepth(tree.right);
  return (
    Math.abs(R - L) <= 1 &&
    isBalanced(tree.left) &&
    isBalanced(tree.right)
  );
}

// solution
// Returns the height of the binary tree or -1 if it is not a binary tree.
function treeHeight(tree) {
  if (tree == null) return 0;
  const leftHeight = treeHeight(tree.left);
  const rightHeight = treeHeight(tree.right);
  if (leftHeight === -1 || rightHeight === -1) return -1;
  if (Math.abs(leftHeight - rightHeight) > 1) return -1;
  return Math.max(leftHeight, rightHeight) + 1;
}

function isBalanced(tree) {
  return treeHeight(tree) !== -1;
}
