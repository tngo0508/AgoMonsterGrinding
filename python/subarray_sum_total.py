from typing import Counter, List

def subarray_sum_total(arr: List[int], target: int) -> int:
    prefix_sums = Counter()
    prefix_sums[0] = 1 # since empty array's sum is 0
    cur_sum = 0
    count = 0
    for i in range(len(arr)):
        cur_sum += arr[i]
        complement = cur_sum - target
        if complement in prefix_sums:
            count += prefix_sums[complement]
        prefix_sums[cur_sum] += 1
    return count