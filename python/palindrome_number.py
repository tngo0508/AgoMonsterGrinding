class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0: return False
        y = 0
        xVal = x
        while xVal > 0:
            temp = xVal % 10
            xVal = xVal // 10
            y = y * 10 + temp 
        return x == y