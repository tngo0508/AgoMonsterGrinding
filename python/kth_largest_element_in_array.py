from typing import List
import heapq

def find_kth_largest(nums: List[int], k: int) -> int:
    # WRITE YOUR BRILLIANT CODE HERE
    minHeap = []
    heapq.heapify(minHeap)
    for num in nums:
        if not minHeap or len(minHeap) < k:
            heapq.heappush(minHeap, num)
        elif minHeap[0] < num:
            heapq.heappop(minHeap)
            heapq.heappush(minHeap, num)
    
    return minHeap[0]


# solution
from heapq import heapify, heappop
from typing import List

def find_kth_largest(nums: List[int], k: int) -> int:
    # max heap
    nums = [-x for x in nums]
    heapify(nums)
    for _ in range(k - 1):
        heappop(nums)
    return -nums[0]

# using quick selection
from typing import List

def find_kth_largest(nums: List[int], k: int) -> int:
    min_pointer = 0
    max_pointer = len(nums) - 1
    while min_pointer < max_pointer:
        pivot = nums[max_pointer]
        swap_left = min_pointer
        swap_right = max_pointer
        while swap_left < swap_right:
            while swap_left < swap_right and nums[swap_left] > pivot:
                swap_left += 1
            while swap_left < swap_right and nums[swap_right] <= pivot:
                swap_right -= 1
            if swap_left < swap_right:
                nums[swap_left], nums[swap_right] = nums[swap_right], nums[swap_left]
        nums[swap_left], nums[max_pointer] = nums[max_pointer], nums[swap_left]
        if swap_left == k - 1:
            return nums[swap_left]
        elif swap_left < k - 1:
            min_pointer = swap_left + 1
        else:
            max_pointer = swap_left - 1
    return nums[min_pointer]

find_kth_largest([3,2,1,5,6,4], 2)    