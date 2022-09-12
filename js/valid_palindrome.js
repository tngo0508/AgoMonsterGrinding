/**
 * @param {string} s
 * @return {boolean}
 */
 var isPalindrome = function(s) {
    function isAlpha(str) {
      return str.length === 1 && str.match(/[a-z0-9]/i);
    }
    let l = 0, r = s.length - 1;
    while (l < r) {
      while (r >= 0 && !isAlpha(s[r])) {
        r -= 1;
      }
      while (l < s.length && !isAlpha(s[l])) {
        l += 1;
      }
      if (l < s.length && r >= 0 && s[l].toLowerCase() !== s[r].toLowerCase()) return false;
      
      r -= 1;
      l += 1;
    }
    return true;
  };

  // solution
  function isAlphaNumeric(c) {
    return /^[a-zA-Z0-9]*$/.test(c);
}

function isPalindrome(s) {
    let l = 0;
    let r = s.length - 1;
    while (l < r) {
        while (l < r && !isAlphaNumeric(s.charAt(l))) {  // Note 1, 2
            l++;
        }
        while (l < r && !isAlphaNumeric(s.charAt(r))) {
            r--;
        }
        if (s.charAt(l).toLowerCase() !== s.charAt(r).toLowerCase()) {  // ignore case
            return false;
        }
        l++;
        r--;
    }
    return true;
}