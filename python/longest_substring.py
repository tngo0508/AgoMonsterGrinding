def longest_substring_without_repeating_characters(s: str) -> int:
    # WRITE YOUR BRILLIANT CODE HERE
    start = end = 0
    n = len(s)
    result = 0
    seen = {}
    for end, c in enumerate(s):
        if c in seen:
            start = max(seen[c] + 1, start)
        seen[c] = end
        result = max(result, end - start + 1)
    return result

print(longest_substring_without_repeating_characters("aba"))
print(longest_substring_without_repeating_characters("abccabcabcc"))

# solution
# sliding window
def longest_substring_without_repeating_characters(s: str) -> int:
    n = len(s)
    longest = 0
    l = r = 0
    window = set()
    while r < n:
        if s[r] not in window:
            window.add(s[r])
            r += 1
        else:
            window.remove(s[l])
            l += 1
        longest = max(longest, r - l)
    return longest