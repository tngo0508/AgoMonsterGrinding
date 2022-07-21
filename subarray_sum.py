# my solution
# sliding window
from typing import List

def subarray_sum(arr: List[int], target: int) -> List[int]:
    # WRITE YOUR BRILLIANT CODE HERE
    start = 0
    currSum = 0
    for end in range(len(arr)):
        currSum += arr[end]
        if currSum < target:
            continue
        while start <= end and currSum >= target:
            if target == currSum:
                return [start, end + 1]
            
            currSum -= arr[start]
            start += 1
              
    return [-1, -1]

# solution
# prefix sum
from typing import List

def subarray_sum(arr: List[int], target: int) -> List[int]:
    # prefix_sum 0 happens when we have an empty array
    prefix_sums = {0: 0}
    cur_sum = 0
    for i in range(len(arr)):
        cur_sum += arr[i]
        complement = cur_sum - target
        if complement in prefix_sums:
            return [prefix_sums[complement], i + 1]
        prefix_sums[cur_sum] = i + 1

print(subarray_sum([1,3,-3,8,5,7], 5))