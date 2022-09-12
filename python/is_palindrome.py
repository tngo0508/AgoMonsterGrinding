def is_palindrome(s: str) -> bool:
    # WRITE YOUR BRILLIANT CODE HERE
    l, r = 0, len(s) - 1
    s = s.lower()
    while l < r:
        while l < len(s) and not s[l].isalnum():
            l += 1
        while r >= 0 and not s[r].isalnum():
            r -= 1
        if l < len(s) and r >= 0 and s[l] != s[r]:
            return False
        l += 1
        r -= 1
    return True

# solution
def is_palindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum(): # Note 1, 2
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower(): # ignore case
            return False
        l += 1
        r -= 1
    return True

# alternative solution
# O(n) space
def is_palindrome(s: str) -> bool:
    s = [c.lower() for c in s if c.isalnum()]
    l, r = 0, len(s) - 1
    while l < r:
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True