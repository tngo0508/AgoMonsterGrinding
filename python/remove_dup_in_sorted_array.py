from typing import List

def remove_duplicates(arr: List[int]) -> int:
    # WRITE YOUR BRILLIANT CODE HERE
    start = 0
    for end in range(len(arr)):
        if arr[end] != arr[start]:
            start += 1
            arr[start] = arr[end]
    return start + 1