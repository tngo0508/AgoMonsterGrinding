/**
 * @param {string} s
 * @return {number}
 */
// time limit exceeded
var numDecodings = function (s) {
  function backtrack(s, n) {
    if (s.length === 0) return 1;
    if (s.startsWith('0')) {
      return 0;
    }
    let numOfWays = 0;
    numOfWays += backtrack(s.slice(1), n);
    if (s.length > 1) {
      const number = parseInt(s.slice(0, 2));
      if (1 <= number && number <= 26)
        numOfWays += backtrack(s.slice(2), n);
    }

    return numOfWays;
  }

  return backtrack(s, s.length);
};

// memoization
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  function backtrack(s, n, memo, start) {
    if (s.length === 0) return 1;
    if (s.startsWith('0')) {
      return 0;
    }
    if (start in memo) return memo[start];
    let numOfWays = 0;
    numOfWays += backtrack(s.slice(1), n, memo, start + 1);
    if (s.length > 1) {
      const number = parseInt(s.slice(0, 2));
      if (1 <= number && number <= 26)
        numOfWays += backtrack(s.slice(2), n, memo, start + 2);
    }

    memo[start] = numOfWays;
    return numOfWays;
  }

  let memo = {};

  return backtrack(s, s.length, memo, 0);
};

// algomonster solution without memoization
// use numbers 1 to 26 to represent all alphabet letters
const LETTERS = Array.from(Array(26).keys(), (n) =>
  (n + 1).toString(10)
);

function decode_ways(digits) {
  return dfs(digits, 0);
}

function dfs(digits, start_index) {
  if (start_index === digits.length) return 1;

  let ways = 0;
  const remaining = digits.slice(start_index);
  for (const letter of LETTERS) {
    if (remaining.startsWith(letter)) {
      // add number of ways returned from child node
      ways += dfs(digits, start_index + letter.length);
    }
  }
  return ways;
}

// algomonster solution with memoization
function decode_ways(digits) {
  let memo = {};
  return dfs(digits, 0, memo);
}
function dfs(digits, start_index, memo) {
  if (start_index in memo) return memo[i];
  if (start_index === digits.length) return 1;
  let ways = 0;
  const remaining = digits.slice(start_index);
  for (const letter of LETTERS) {
    if (remaining.startsWith(letter)) {
      ways += dfs(digits, start_index + letter.length, memo);
    }
  }
  memo[start_index] = ways;
  return ways;
}
