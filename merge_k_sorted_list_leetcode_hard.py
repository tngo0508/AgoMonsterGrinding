# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        def merge(l1, l2):
            sentinel = ListNode(-1)
            curr = sentinel
            while l1 or l2:
                val1 = l1.val if l1 else float(inf)
                val2 = l2.val if l2 else float(inf)
                if val1 < val2:
                    curr.next = l1
                    l1 = l1.next if l1 else None
                else:
                    curr.next = l2
                    l2 = l2.next if l2 else None
                curr = curr.next
            return sentinel.next
        
        if len(lists) == 1: return lists[0]
        head = None
        i = 0
        while len(lists) > 1:
            l1 = lists.pop(0) if lists else None
            l2 = lists.pop(0) if lists else None
            if l1: i += 1
            if l2: i += 1
            head = merge(l1, l2)
            lists.append(head)
        
        return head
        
        