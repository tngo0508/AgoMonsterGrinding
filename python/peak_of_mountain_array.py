from typing import List

def peak_of_mountain_array(arr: List[int]) -> int:
    # WRITE YOUR BRILLIANT CODE HERE
#     0 1 2 3 2 1 0
#     l     m     r
    l, r = 0, len(arr) - 1
    while l + 1 < r:
        m = l + (r - l) // 2
        if m - 1 >= 0 and arr[m - 1] > arr[m]:
            r = m
        else:
            l = m
  
    return l

print(peak_of_mountain_array([0, 1, 2, 3, 2, 1, 0]))
print(peak_of_mountain_array([0, 10, 3, 2, 1, 0]))