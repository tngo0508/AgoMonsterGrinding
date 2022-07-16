from typing import List

def permutations(letters: str) -> List[str]:
    # WRITE YOUR BRILLIANT CODE HERE
    # there are multiple ways to do this problem, the tricky part is that we need to verify if the result can be in random order or not
    # if the result needs to be in order then list sliding method will be applied
    # otherwise, we can do the swapping method if the question doesn't ask for the order of the output

    # this method preserves the order
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

    # swapping method doesn't preserve the order
    def backtrack_swap_method(first, s, curr, res):
        if len(s) == len(curr):
            res.append("".join(curr[:]))
            return
        for i in range(first, len(s)):
            curr.append(s[i])
            s[first], s[i] = s[i], s[first]
            backtrack(first, s, curr, res)
            s[first], s[i] = s[i], s[first]
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