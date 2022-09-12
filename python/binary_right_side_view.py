from typing import List
from collections import deque

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def binary_tree_right_side_view(root: Node) -> List[int]:
    # WRITE YOUR BRILLIANT CODE HERE
    queue = deque([root])
    result = []
    while queue:
        length = len(queue)
        currLevel = []
        for _ in range(length):
            node = queue.popleft()
            if node:
                currLevel.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
        result.append(currLevel[-1])
        
    return result

# solution
from collections import deque

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def binary_tree_right_side_view(root):
    res = []
    queue = deque([root]) # at least one element in the queue to kick start bfs
    while len(queue) > 0: # as long as there is element in the queue
        n = len(queue) # number of nodes in current level
        res.append(queue[0].val) # only append the first node we encounter since it's the rightmost
        for _ in range(n): # dequeue each node in the current level
            node = queue.popleft()
            for child in [node.right, node.left]: # we add right children first so it'll pop out of the queue first
                if child is not None:
                    queue.append(child)
    return res