from typing import List

def subsets(nums: List[int]) -> List[List[int]]:
    # WRITE YOUR BRILLIANT CODE HERE
    def backtrack(nums, curr, result, start):
        if start == len(nums):
            result.append(curr[:])
            return
        
        result.append(curr[:])
        for i in range(start, len(nums)):
            curr.append(nums[i])
            backtrack(nums, curr, result, i + 1)
            curr.pop()
        
        
    result = []
    backtrack(nums, [], result, 0)
    return result


# Solution
# make the binary choice: include or don't include the current number
def subsetsSolution(nums: List[int]) -> List[List[int]]:
    n = len(nums)

    res = []
    def dfs(i, cur):
        if i == n:
            res.append(cur)
            return

        dfs(i + 1, cur + [nums[i]])
        dfs(i + 1, cur)

    dfs(0, [])

    return res


# print(subsets([1,2,3]))
print(subsetsSolution([1,2,3]))