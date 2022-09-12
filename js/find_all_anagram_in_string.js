/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// TLE approach
var findAnagrams = function (s, p) {
  const pLen = p.length;
  const pSet = new Set(p);
  const target = [...p].sort().join('');
  const res = [];
  for (let i = 0; i < s.length - pLen + 1; ++i) {
    const c = s.charAt(i);
    if (pSet.has(c)) {
      const currString = Array.from(s.slice(i, i + pLen))
        .sort()
        .join('');
      if (currString === target) res.push(i);
    }
  }
  return res;
};

// using hashmap approach
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const equals = (a, b) => {
    if (a.size !== b.size) return false;
    for (const k of a.keys()) {
      if (a.get(k) !== b.get(k)) return false;
    }
    return true;
  };
  const pCounter = new Map();
  const counter = new Map();
  const res = [];
  let start = 0;
  for (const c of p) {
    pCounter.set(c, (pCounter.get(c) || 0) + 1);
  }
  for (let end = 0; end < s.length; ++end) {
    const c = s.charAt(end);
    counter.set(c, (counter.get(c) || 0) + 1);
    if (end + 1 < p.length) {
      continue;
    }

    if (equals(pCounter, counter)) res.push(start);

    const startChar = s.charAt(start);
    start += 1;
    counter.set(startChar, counter.get(startChar) ? counter.get(startChar) - 1 : 0);
    if (counter.get(startChar) === 0) counter.delete(startChar);
  }
  return res;
};

// solution
function findAllAnagrams(original, check) {
  const originalLen = original.length;
  const checkLen = check.length;
  if (originalLen < checkLen) return [];

  const res = [];
  const checkCounter = Array(26).fill(0);
  const window = Array(26).fill(0);
  const a = 'a'.charCodeAt(); // ascii value of 'a'
  for (let i = 0; i < checkLen; i++) {
    checkCounter[check.charCodeAt(i) - a]++;
    window[original.charCodeAt(i) - a]++;
  }
  if (equals(window, checkCounter)) res.push(0);

  for (i = checkLen; i < originalLen; i++) {
    window[original.charCodeAt(i - checkLen) - a]--;
    window[original.charCodeAt(i) - a]++;
    if (equals(window, checkCounter)) res.push(i - checkLen + 1);
  }
  return res;
}

function equals(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i]);
}
