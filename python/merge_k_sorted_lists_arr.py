from typing import List
import heapq

def merge_k_sorted_lists(lists: List[List[int]]) -> List[int]:
    # WRITE YOUR BRILLIANT CODE HERE
    res = []
    minHeap = []
    heapq.heapify(minHeap)
    for currList in lists:
        heapq.heappush(minHeap, (currList[0], currList, 0))
        
    while len(minHeap) > 0:
        val, curr, idx = heapq.heappop(minHeap)
        res.append(val)
        idx += 1
        if idx < len(curr):
            heapq.heappush(minHeap, (curr[idx], curr, idx))
    
    return res