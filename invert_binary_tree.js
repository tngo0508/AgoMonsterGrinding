class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function invertBinaryTree(tree) {
  // WRITE YOUR BRILLIANT CODE HERE
  if (!tree) return null;
  tree.left = invertBinaryTree(tree.left);
  tree.right = invertBinaryTree(tree.right);
  const temp = tree.left;
  tree.left = tree.right;
  tree.right = temp;
  return tree;
}

// solution
function invertBinaryTree(tree) {
  if (tree == null) return null;
  return new Node(tree.val, invertBinaryTree(tree.right), invertBinaryTree(tree.left));
}
