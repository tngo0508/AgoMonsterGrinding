/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function (digits) {
  numberToLetter = {
    1: '',
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
    0: '',
  };
  function backtrack(digits, start, curr, res) {
    if (curr.length === digits.length || start === digits.length) {
      res.push([...curr].join(''));
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
};
