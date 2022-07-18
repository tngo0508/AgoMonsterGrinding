from collections import deque
class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def binary_tree_min_depth(root: Node) -> int:
    # WRITE YOUR BRILLIANT CODE HERE
    queue = deque([(root, 0)])
    level = 0
    while queue:
        node, level = queue.popleft()
        if node: 
            if not node.left and not node.right:
                return level
            
            if node.left:
                queue.append((node.left, level + 1))
            if node.right:
                queue.append((node.right, level + 1))
            
    return level

# solution
from collections import deque

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def binary_tree_min_depth(root: Node) -> int:
    queue = deque([root]) # at least one element in the queue to kick start bfs
    depth = -1 # we start from -1 because popping root will add 1 depth
    while len(queue) > 0: # as long as there is element in the queue
        depth += 1
        n = len(queue) # number of nodes in current level
        for _ in range(n): # dequeue each node in the current level
            node = queue.popleft()
            if node.left is None and node.right is None: # found leaf node, early return
                return depth
            for child in [node.left, node.right]:
                if child is not None:
                    queue.append(child)
    return depth