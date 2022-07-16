from typing import List

class Node:
    def __init__(self, val, children=None):
        if children is None:
            children = []
        self.val = val
        self.children = children

def ternary_tree_paths(root: Node) -> List[str]:
    # WRITE YOUR BRILLIANT CODE HERE
    def helper(node, curr, res):
        if node and not node.children:
            res.append("->".join(curr))
            return
        
        for childNode in node.children:
            helper(childNode, curr + [str(childNode.val)], res)   
            
    result = []
    helper(root, [str(root.val)], result) 
    return result

# this function build a tree from input
# learn more about how trees are encoded in https://algo.monster/problems/serializing_tree
def build_tree(nodes, f):
    val = next(nodes)
    num = int(next(nodes))
    children = [build_tree(nodes, f) for _ in range(num)]
    return Node(f(val), children)

if __name__ == '__main__':
    root = build_tree(iter(input().split()), int)
    res = ternary_tree_paths(root)
    for line in res:
        print(line)
