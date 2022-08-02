/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// time limit exceeded solution
 var wordBreak = function(s, wordDict) {
    function backtrack(s, wordDict, curr) {
        if (curr) {
            const currStr = curr.join("");
            if (currStr.length >= s.length) {
                return currStr === s;
            }
        }
        let result = false;
        for (let i = 0; i < wordDict.length; ++i) {
            curr.push(wordDict[i]);
            if (backtrack(s, wordDict, curr))
                result = true;
            curr.pop();
        }
        return result;
    }
    
    return backtrack(s, wordDict, []);
};

// solution using memoization
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
 var wordBreak = function(s, wordDict) {
    function backtrack(s, wordDict, memo, start) {
        if (start === s.length) return true;
        if (start in memo) return memo[start];
        let result = false;
        for (const word of wordDict) {
            if (s.slice(start).startsWith(word)) {
                if (backtrack(s, wordDict, memo, start + word.length)) {
                    result = true;
                    break;
                }
            }
        }
        memo[start] = result;
        return result;
    }
    
    let memo = {};
    return backtrack(s, wordDict, memo, 0);
};