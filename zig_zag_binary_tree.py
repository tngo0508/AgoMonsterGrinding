class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def zig_zag_traversal(root: Node) -> List[List[int]]:
    # WRITE YOUR BRILLIANT CODE HERE
    if not root:
        return []
    
    queue = deque([root])
    leftToRight = True
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
        if leftToRight:
            result.append(currLevel[:])
        else:
            result.append(currLevel[::-1])
        leftToRight = not leftToRight
    return result


# solution
from collections import deque
from typing import List

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def zig_zag_traversal(root: Node) -> List[List[int]]:
    res = []
    queue = deque([root]) # at least one element in the queue to kick start bfs
    left_to_right = True
    while len(queue) > 0: # as long as there is element in the queue
        n = len(queue) # number of nodes in current level, see explanation above
        new_level = []
        for _ in range(n): # dequeue each node in the current level
            node = queue.popleft()
            new_level.append(node.val)
            for child in [node.left, node.right]: # enqueue non-null children
                if child is not None:
                    queue.append(child)
        if not left_to_right:
            new_level.reverse() # reverse current level
        res.append(new_level)
        left_to_right = not left_to_right # flip flag
    return res