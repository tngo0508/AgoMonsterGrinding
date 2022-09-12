from typing import List

def partition(s: str) -> List[List[str]]:
    # WRITE YOUR BRILLIANT CODE HERE
    # check each character in the string to see if it's a palindrome or not
    # if not palindrome, prune the path. Otherwise, continue to check for the next character
    '''
                          [a a b]
                      /      |      \
                     a      aa       aab
                    / \      |        X
                   a   ab    b 
                  /    X     [aa, b]
                 b
              [a,a,b]

    '''


    result = []
    def isPalindrome(word):
        return word == word[::-1]
    
    def dfs(start, curr):
        if start == len(s):
            result.append(curr[:])
            return
        
        for i in range(start + 1, len(s) + 1):
            if isPalindrome(s[start:i]):
                curr.append(s[start:i])
                dfs(i, curr)
                curr.pop()
    
    dfs(0, [])
    return result