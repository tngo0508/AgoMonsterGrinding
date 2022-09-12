from typing import List

def combination_sum(candidates: List[int], target: int) -> List[List[int]]:
    # WRITE YOUR BRILLIANT CODE HERE
    result = []
    def backtrack(curr, currSum):
        if currSum == target:
            sortedList = list(sorted(curr[:]))
            if sortedList not in result:
                result.append(sortedList)
            return
        
        for candidate in candidates:
            if currSum + candidate <= target:
                curr.append(candidate)
                backtrack(curr, currSum + candidate)
                curr.pop()
    
    backtrack([], 0)
    return result


    # solution

    # The way we dedup is to only use candidate numbers whose index in the array is >= last used number's index.
    # we can do this due to the DFS order
    # We use an additional state start_index to keep track of the position of the last used number 
from typing import List

def combination_sum(candidates: List[int], target: int) -> List[List[int]]:
    def dfs(nums, start_index, remaining, path):
        if remaining == 0:
            res.append(path[:])
            return
        for i in range(start_index, len(nums)):
            num = nums[i]
            if remaining - num < 0:
                continue
            dfs(nums, i, remaining - num, path + [num])
    res = []
    dfs(candidates, 0, target, [])
    return res