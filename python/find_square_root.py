def square_root(n: int) -> int:
    # WRITE YOUR BRILLIANT CODE HERE
    # 1 2 3  4  5  6  7  8  9  10
    # 1 4 9 16 25 36 49 64 81 100 
    # l, r = 0, n
    # while l <= r:
    #     m = l + (r - l) // 2
    #     val1 = m*m
    #     val2 = (m + 1)**2
    #     if val1 <= n < val2:
    #         return m
    #     elif val1 > n:
    #         r = m - 1
    #     else:
    #         l = m + 1
  
    # return -1

    if n == 0:
        return 0
    left, right = 1, n
    res = -1
    while left <= right:
        mid = (left + right) // 2
        if mid * mid <= n:
            res = mid
            left = mid + 1
        else:
            right = mid - 1
    return res

print(square_root(4))
print(square_root(8))
print(square_root(10))