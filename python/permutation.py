from typing import List

def permutations(letters: str) -> List[str]:
    # WRITE YOUR BRILLIANT CODE HERE
    # make sure make a deepcopy of candidate solution before return when complete 1 path
    # slicing method
    def backtrack(first, s, curr, res):
        if len(s) == 0:
            res.append("".join(curr[:]))
            return
        for i in range(first, len(s)):
            curr.append(s[i])
            backtrack(first, s[:i] + s[i+1:], curr, res)
            curr.pop() 
    
    result = []
    letterArr = list(letters)
    backtrack(0, letterArr, [], result)
    return result

# solution
def permutations(letters):
    def dfs(path, used, res):
        if len(path) == len(letters):
            res.append(''.join(path))
            return

        for i, letter in enumerate(letters):
            # skip used letters
            if used[i]:
                continue
            # add letter to permutation, mark letter as used
            path.append(letter)
            used[i] = True
            dfs(path, used, res)
            # remove letter from permutation, mark letter as unused
            path.pop()
            used[i] = False

    res = []
    dfs([], [False] * len(letters), res)
    return res

print(permutations("abc"))
print(permutations("ab"))

# leetcode solution - swap method
class Solution:
    def permute(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """
        def backtrack(first = 0):
            # if all integers are used up
            if first == n:  
                output.append(nums[:])
            for i in range(first, n):
                # place i-th integer first 
                # in the current permutation
                nums[first], nums[i] = nums[i], nums[first]
                # use next integers to complete the permutations
                backtrack(first + 1)
                # backtrack
                nums[first], nums[i] = nums[i], nums[first]
        
        n = len(nums)
        output = []
        backtrack()
        return output