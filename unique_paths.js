/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// using memoization to cache the results that are already computed
 var uniquePaths = function(m, n) {
    function dfs(row, col, memo) {
        if (row === m - 1 && col === n - 1) {
            return 1;
        }
        if (row > m - 1 || col > n - 1) {1
            return 0;
        }
        const key = [row, col].join();
        if (memo.has(key)) return memo.get(key);
        let down = dfs(row + 1, col, memo);
        let right = dfs(row, col + 1, memo);
        memo.set(key, down + right);
        return memo.get(key);
    }
    
    const memo = new Map();
    return dfs(0, 0, memo);
};