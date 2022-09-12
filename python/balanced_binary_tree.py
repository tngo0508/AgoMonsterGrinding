class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_balanced(tree: Node) -> bool:
    # WRITE YOUR BRILLIANT CODE HERE
    def getHeight(node):
        if not node:
            return 0
        return max(getHeight(node.left), getHeight(node.right)) + 1
    
    if not tree:
        return True
    
    heightLeft = getHeight(tree.left) if tree.left else 0
    heightRight = getHeight(tree.right) if tree.right else 0
    if abs(heightLeft - heightRight) > 1:
        return False
    return is_balanced(tree.left) and is_balanced(tree.right)


    # second approach
def is_balanced_second_approach(tree: Node) -> bool:
    # WRITE YOUR BRILLIANT CODE HERE
    def getMaxDepth(root, currDepth):
        if not root:
            return 0
        heightLeft = getMaxDepth(root.left, currDepth)
        heightRight = getMaxDepth(root.right, currDepth)
        if abs(heightLeft - heightRight) > 1:
            return -1
        if heightLeft == -1 or heightRight == -1:
            return -1
        return max(heightLeft, heightRight) + 1
    
    
    return getMaxDepth(tree, tree.val) != -1