class Solution:
    # @param A : list of integers
    # @return an integer
	# def solve(self, A):
	# 	res = []
	# 	self.helper(A, 0, 0, res)
	# 	return min(res)

	# def helper(self, A, curr, first, res):
	# 	if first >= len(A):
	# 		return
	# 	curr = curr + A[first]
	# 	if first == len(A) - 1:
	# 		res.append(curr)
	# 		return 
	# 	self.helper(A, curr, first + 1, res)
	# 	self.helper(A, curr, first + 2, res)

	def solve(self, A):
		if len(A) == 2:
			return min(A)
		dp = [0] * len(A)
		dp[0] = A[0]
		dp[1] = A[0] + A[1]
		for i in range(2, len(A)):
			dp[i] = A[i] + min(dp[i - 1], dp[i - 2])
		print(dp)
		return dp[-1]


solution = Solution()
print(solution.solve([1, 2, 1, 3]))
print(solution.solve([1, 2, 3, 4]))