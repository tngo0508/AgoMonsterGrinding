from typing import List
import heapq

def merge_k_sorted_lists(lists: List[List[int]]) -> List[int]:
    # WRITE YOUR BRILLIANT CODE HERE
    minHeap = []
    res = []
    heapq.heapify(minHeap)
    for x in lists:
        for y in x:
            heapq.heappush(minHeap, y)
    
    while minHeap:
        res.append(heapq.heappop(minHeap))
        
    return res

# solution
from heapq import heappop, heappush
from typing import List

def merge_k_sorted_lists_solution(lists: List[List[int]]) -> List[int]:
    res = []
    heap = []
    for current_list in lists:
        # push first number of each list into the heap
        heappush(heap, (current_list[0], current_list, 0)) # 1

    while heap:
        val, current_list, head_index = heappop(heap)
        res.append(val)
        head_index += 1
        # if there are more numbers in the list, push into the heap
        if head_index < len(current_list):
            heappush(heap, (current_list[head_index], current_list, head_index))

    return res

print(merge_k_sorted_lists_solution([[1, 3, 5], [2, 4, 6], [7, 10]]))