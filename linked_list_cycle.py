class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def has_cycle(nodes: Node) -> bool:
    # WRITE YOUR BRILLIANT CODE HERE
    slow = fast = nodes
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if fast is slow:
            return True
    
    return False

# solution
def node_next(node):
    return node.next or node

def has_cycle(nodes: Node) -> bool:
    tortoise = node_next(nodes)
    hare = node_next(node_next(nodes))
    while tortoise != hare and hare.next is not None:
        tortoise = node_next(tortoise)
        hare = node_next(node_next(hare))
    return hare.next is not None