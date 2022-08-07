# my solution
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        res = []
        start = 0
        
        pDict = {}
        for c in p:
            pDict[c] = pDict.get(c, 0) + 1
        
        currDict = {}
        size = len(p)
        for end, c in enumerate(s):
            currDict[c] = currDict.get(c, 0) + 1
            if end + 1 < size:
                continue
            
            if currDict == pDict:
                res.append(start)
            
            currDict[s[start]] -= 1
            if currDict[s[start]] == 0:
                del currDict[s[start]]
            start += 1
        return res

# algomonster solution
from typing import List

def find_all_anagrams(original: str, check: str) -> List[int]:
    original_len, check_len = len(original), len(check)
    if original_len < check_len:
        return []

    res = []
    # stores the frequency of each character in the check string
    check_counter = [ 0 ] * 26
    # stores the frequency of each character in the current window
    window = [ 0 ] * 26
    a = ord('a')  # ascii value of 'a'
    # first window
    for i in range(check_len):
        check_counter[ord(check[i]) - a] += 1
        window[ord(original[i]) - a] += 1
    if window == check_counter:
        res.append(0)

    for i in range(check_len, original_len):
        window[ord(original[i - check_len]) - a] -= 1
        window[ord(original[i]) - a] += 1
        if window == check_counter:
            res.append(i - check_len + 1)
    return res

# leetcode solution
from collections import Counter
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        ns, np = len(s), len(p)
        if ns < np:
            return []

        p_count = Counter(p)
        s_count = Counter()
        
        output = []
        # sliding window on the string s
        for i in range(ns):
            # add one more letter 
            # on the right side of the window
            s_count[s[i]] += 1
            # remove one letter 
            # from the left side of the window
            if i >= np:
                if s_count[s[i - np]] == 1:
                    del s_count[s[i - np]]
                else:
                    s_count[s[i - np]] -= 1
            # compare array in the sliding window
            # with the reference array
            if p_count == s_count:
                output.append(i - np + 1)
        
        return output

# leetcode - sliding window with array
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        ns, np = len(s), len(p)
        if ns < np:
            return []

        p_count, s_count = [0] * 26, [0] * 26
        # build reference array using string p
        for ch in p:
            p_count[ord(ch) - ord('a')] += 1
        
        output = []
        # sliding window on the string s
        for i in range(ns):
            # add one more letter 
            # on the right side of the window
            s_count[ord(s[i]) - ord('a')] += 1
            # remove one letter 
            # from the left side of the window
            if i >= np:
                s_count[ord(s[i - np]) - ord('a')] -= 1
            # compare array in the sliding window
            # with the reference array
            if p_count == s_count:
                output.append(i - np + 1)
        
        return output