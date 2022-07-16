from typing import List

def letter_combinations_of_phone_number(digits: str) -> List[str]:
    # WRITE YOUR BRILLIANT CODE HERE
    
    letterMap = {
        "1": [],
        "2": ["a", "b", "c"],
        "3": ["d", "e", "f"],
        "4": ["g", "h", "i"],
        "5": ["j", "k", "l"],
        "6": ["m", "n", "o"],
        "7": ["p", "q", "r", "s"],
        "8": ["t", "u", "v"],
        "9": ["w", "x", "y", "z"],
    }
    
    def backtrack(A, first, curr, res):
        if len(curr) == len(A):
            res.append("".join(curr))
            return
        currDigit = A[first]
        if currDigit in letterMap:
            for letter in letterMap[currDigit]:
                curr.append(letter)
                backtrack(A, first + 1, curr, res)
                curr.pop()
    
    if not digits:
        return []
    
    result = []
    backtrack(digits, 0, [], result)
    return result

# solution
KEYBOARD = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
}

def letter_combinations_of_phone_number(digits: str) -> List[str]:
    def dfs(path, res):
        if len(path) == len(digits):
            res.append(''.join(path))
            return

        next_number = digits[len(path)]
        for letter in KEYBOARD[next_number]:
            path.append(letter)
            dfs(path, res)
            path.pop()

    res = []
    dfs([], res)
    return res