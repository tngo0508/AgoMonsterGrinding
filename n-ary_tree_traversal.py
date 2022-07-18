"""
# Definition for a Node.
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children
"""

class Solution:
    def preorder(self, root: 'Node') -> List[int]:
        result = []
        def helper(node, res):
            res.append(node.val)
            for childNode in node.children:
                if childNode:
                    helper(childNode, res)
            
            
        if not root:
            return []
        
        helper(root, result)
        return result

# leetcode solution
# iterative approach
class Solution(object):
    def preorder(self, root):
        """
        :type root: Node
        :rtype: List[int]
        """
        if root is None:
            return []
        
        stack, output = [root, ], []            
        while stack:
            root = stack.pop()
            output.append(root.val)
            stack.extend(root.children[::-1])
                
        return output