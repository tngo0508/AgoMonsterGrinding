class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def visible_tree_node(root: Node) -> int:
    # WRITE YOUR BRILLIANT CODE HERE
    def dfs(root, currMax):
        if not root:
            return 0
        if root.val >= currMax:  
            return dfs(root.left, root.val) + dfs(root.right, root.val) + 1
        return dfs(root.left, currMax) + dfs(root.right, currMax)
        
    
    return dfs(root, root.val)