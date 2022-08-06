/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
    let start = 0;
    let seen = new Map();
    let res = 0;
    for (let end = 0; end < s.length; ++end) {
      const c = s[end];
      if (seen.has(c) && start <= seen.get(c)) {
        start = seen.get(c) + 1;
      }
      seen.set(c, end);
      res = Math.max(res, end - start + 1);
    }
    return res;
  };

// algomonster solution
function longestSubstringWithoutRepeatingCharacters(s) {
    const n = s.length;
    let longest = 0;
    let l = r = 0;
    const window = new Set();
    while (r < n) {
        if (!window.has(s.charAt(r))) {
            window.add(s.charAt(r));
            r++;
        } else {
            window.delete(s.charAt(l));
            l++;
        }
        longest = Math.max(longest, r - l);
    }
    return longest;
}