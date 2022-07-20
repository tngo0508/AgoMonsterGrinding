class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def middle_of_linked_list(head: Node) -> int:
    # WRITE YOUR BRILLIANT CODE HERE
    sentinel = Node(-1)
    sentinel.next = head
    slow = sentinel
    fast = sentinel.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow.next.val if slow and slow.next else slow

# solution
def middle_of_linked_list(head: Node) -> int:
    slow = fast = head
    while fast and fast.next:
        fast = fast.next.next
        slow = slow.next
    return slow.val