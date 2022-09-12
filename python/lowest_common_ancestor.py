# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    # the idea is to do the post-order traversal
    # assume we are a node, we need to find the node p and q while traversing the tree
    # if the left node or right node is one of the target nodes, and we are one of target nodes as well
    # then, we return ourselves
    # otherwise, we keep recursively checking for left and right subtree. in this case, if we find
    # the node q or p, then return True if one of the targets is found to the caller function and compare again until
    # both targets are found
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        self.ans = None
        def dfs(node):
            if not node:
                return False
            
            L = dfs(node.left)
            R = dfs(node.right)
            mid = True if node is q or node is p else False
            if L + R + mid >= 2:
                self.ans = node
                return True
            return L or R or mid
        
        
        dfs(root)
        return self.ans

    # other approach
    def lca(root, node1, node2):
        if not root:
            return

        # case 2 in above figure
        if root == node1 or root == node2:
            return root

        left = lca(root.left, node1, node2)
        right = lca(root.right, node1, node2)

        # case 1
        if left and right:
            return root

        # at this point, left and right can't be both non-null since we checked above
        # case 4 and 5, report target node or LCA back to parent
        if left:
            return left
        if right:
            return right

        # case 4, not found return null
        return None