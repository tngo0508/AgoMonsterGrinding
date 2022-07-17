from typing import List

def word_break(s: str, words: List[str]) -> bool:
    # WRITE YOUR BRILLIANT CODE HERE
    # native approach
    # try to combine all the words in word dictionary in any combination
    # to implement this, use backtracking to try one word at a time, if the length of the constructed string is larger or equal
    # to the input string. Then, compare to determine if that path is valid or not. 

    def backtrack(string, curr, wordDictionary):
        currString = "".join(curr)
        if len(currString) >= len(string):
            if string == currString:
                return True
            else:
                return False

        if currString in memo:
            return memo[currString]

        for word in wordDictionary:
            curr.append(word)
            memo["".join(curr)] = backtrack(string, curr, wordDictionary)
            curr.pop()

        return memo[string] if string in memo else False
        
        
    memo = {}
    return backtrack(s, [], words)

    # solution
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        def dfs(start, s):
            if start >= len(s):
                return True
            
            if start in memo:
                return memo[start]
            
            result = False
            for word in wordDict:
                if s[start:].startswith(word):
                    if dfs(start + len(word), s):
                        result = True
                        break
            
            memo[start] = result
            return memo[start]
        
        memo = {}
        return dfs(0, s)