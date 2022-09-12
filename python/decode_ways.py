def decode_ways(digits: str) -> int:
    # WRITE YOUR BRILLIANT CODE HERE
    # naive approach: the important thing is to realize that there are only two choices at each recursive call
    # either pick single digit or double digits to proceed to the next recursive call
    # use index to move to the next recursive call
    # the base case: when the running index is equal to the length of the input string, we know that we can decode at least 1 
    # edge cases: we need to take care of leading zeroes, basically we just return 0 when the digit at running index is 0
    def dfs(startIdx, digits):
        if startIdx == len(digits):
            return 1
        if startIdx > len(digits):
            return 0
        if digits[startIdx] == '0':
            return 0
        
        ways = 0
        if 1 <= int(digits[startIdx]) <= 26:
            ways += dfs(startIdx + 1, digits)
        if 1 <= int(digits[startIdx : startIdx + 2]) <= 26:
            ways += dfs(startIdx + 2, digits)
        
        return ways
    
    return dfs(0, digits)


    # improved approach
    # use memoization to cache the index that we already computed
    def memoization(startIdx, digits):
        if startIdx == len(digits):
            return 1
        if startIdx > len(digits):
            return 0
        if digits[startIdx] == '0':
            return 0
        
        if startIdx in memo:
            return memo[startIdx]


        ways = 0
        if 1 <= int(digits[startIdx]) <= 26:
            ways += memoization(startIdx + 1, digits)
        if 1 <= int(digits[startIdx : startIdx + 2]) <= 26:
            ways += memoization(startIdx + 2, digits)
        memo[startIdx] = ways
        return memp[startIdx]
    memo = {}
    return memoization(0, digits)