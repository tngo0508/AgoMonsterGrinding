from typing import List

def two_sum_sorted(arr: List[int], target: int) -> List[int]:
    # WRITE YOUR BRILLIANT CODE HERE
    left, right = 0, len(arr) - 1
    while left < right:
        currSum = arr[left] + arr[right]
        if currSum == target:
            return [left, right]
        elif currSum > target:
            right -= 1
        else:
            left += 1
    return [-1, -1]

# solution
def two_sum_sorted(arr: List[int], target: int) -> List[int]:
    l, r = 0, len(arr) - 1
    while l < r:
        two_sum = arr[l] + arr[r]
        if two_sum == target:
            return [l, r]
        if two_sum < target:
            l += 1
        else:
            r -= 1