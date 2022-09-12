class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        
        def helper(string, hashmap):
            for i, c in enumerate(string):
                hashmap[c] = hashmap.get(c, []) + [i]
            return hashmap
            
        dict1 = helper(s, {})
        dict2 = helper(t, {})
        
        for i in range(len(s)):
            c1 = s[i]
            c2 = t[i]
            if dict1[c1] != dict2[c2]:
                return False
        return True
            
            
        