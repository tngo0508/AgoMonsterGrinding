from typing import List

def find_first_occurrence(arr: List[int], target: int) -> int:
#     [0, 1, 2, 3, 4, 5,  6,  7,  8,  9]
#     [1, 3, 3, 3, 3, 6, 10, 10, 10, 100]
#      l          
#      m  r                 
    l, r = 0, len(arr) - 1
    # while l < r:
    #     m = l + (r - l) // 2
    #     if arr[m] > target:
    #         r = m - 1
    #     elif arr[m] < target:
    #         l = m + 1
    #     else:
    #         r = m
    
    while l < r:
        m = l + (r - l) // 2
        if arr[m] >= target:
            r = m
        else:
            l = m + 1

    return r if arr[r] == target else -1

# print(find_first_occurrence([1, 3, 3, 3, 3, 6, 10, 10, 10, 100], 3))
print(find_first_occurrence([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 1))
