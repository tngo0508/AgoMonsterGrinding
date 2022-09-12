# Definition for a binary tree node.
from math import inf
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    # the trick is to use the boundary to check for low and high when we reach a node
    # if the node.val is not satisfied the boundary check, we know that the tree is not BST
    # also, we need to make sure to check for both left subtree and right subtree
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def dfs(node, lo, hi):
            if not node:
                return True
            if lo >= node.val or node.val >= hi:
                return False
            return dfs(node.left, lo, node.val) and dfs(node.right, node.val, hi)
        
        return dfs(root, float('-inf'), float('inf'))

    def valid_bst(root: Node) -> bool:
        def dfs(root, min_val, max_val):
            # empty nodes are always valid
            if not root:
                return True

            if not (min_val <= root.val <= max_val):
                return False

            # see notes below
            return dfs(root.left, min_val, root.val) and dfs(root.right, root.val, max_val)

        return dfs(root, -inf, inf) # root is always valid