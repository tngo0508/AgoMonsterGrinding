function letterCombinationsOfPhoneNumber(digits) {
    // WRITE YOUR BRILLIANT CODE HERE
    numberToLetter = {
        "1": "",
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz",
        "0": "",
    }
    function backtrack(digits, start, curr, res) {
        if (start === digits.length) {
            res.push([...curr].join(""));
            return;
        }
        letters = numberToLetter[digits[start]];
        for (const letter of letters) {
            curr.push(letter);
            backtrack(digits, start + 1, curr, res);
            curr.pop();
        }
    }
    
    if (digits.length === 0) return [];
                
    const res = [];
    backtrack(digits, 0, [], res);
    return res;
}

// solution
const KEYBOARD = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
  };
  
  function dfs(digits, path, res) {
      if (path.length === digits.length) {
          res.push(path.join(''));
          return;
      }
      let next_number = digits.charAt(path.length);
      for (let letter of KEYBOARD[next_number]) {
          path.push(letter);
          dfs(digits, path, res);
          path.pop();
      }
  }
  
  function letterCombinationsOfPhoneNumber(digits) {
      let res = [];
      dfs(digits, [], res);
      return res;
  }