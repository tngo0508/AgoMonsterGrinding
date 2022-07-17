from typing import List

def word_break(s: str, words: List[str]) -> bool:
    # WRITE YOUR BRILLIANT CODE HERE
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