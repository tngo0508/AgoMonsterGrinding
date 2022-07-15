# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Codec:

    def serialize(self, root):
        """Encodes a tree to a single string.
        
        :type root: TreeNode
        :rtype: str
        """
        if not root:
            return "x"
        curr = [str(root.val)]
        curr += [self.serialize(root.left)]
        curr += [self.serialize(root.right)]
        return " ".join(curr)

    def deserialize(self, data):
        """Decodes your encoded data to tree.
        
        :type data: str
        :rtype: TreeNode
        """
        def dfs(nodes):
            val = nodes.pop(0)
            if val == "x":
                return None
            currNode = TreeNode(val)
            currNode.left = dfs(nodes)
            currNode.right = dfs(nodes)
            return currNode
        if not data:
            return None
        arr = data.split(" ")
        return dfs(arr)
            
            
            
        

# Your Codec object will be instantiated and called as such:
# ser = Codec()
# deser = Codec()
# ans = deser.deserialize(ser.serialize(root))