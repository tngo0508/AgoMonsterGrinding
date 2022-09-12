from typing import List
import heapq
import math

def k_closest_points(points: List[List[int]], k: int) -> List[List[int]]:
    # WRITE YOUR BRILLIANT CODE HERE
    minHeap = [(0, [0,0])]
    heapq.heapify(minHeap)
    for x, y in points:
        distance = math.sqrt(x**2 + y**2)
        heapq.heappush(minHeap, (distance, (x, y)))
        
        
    for _ in range(k):
        heapq.heappop(minHeap)
    return [minHeap[0][1]]

print(k_closest_points([(1, 1), (2, 2), (3, 3)], 1))

# solution
from heapq import heappop, heappush
from math import sqrt
from typing import List

def k_closest_points(points: List[List[int]], k: int) -> List[List[int]]:
    heap = []

    for pt in points:
        heappush(heap, (sqrt(pt[0] ** 2 + pt[1] ** 2), pt))

    res = []
    for _ in range(k):
        _, pt = heappop(heap)
        res.append(pt)

    return res