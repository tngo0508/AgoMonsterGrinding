/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
/**
 * my solution: using sliding window technique, the idea is to keep expand the window until we see there is a potential solution
 * then, we shrink the window to check if there is another candidation that has smaller length
 */
var minWindow = function (s, t) {
  function isValid(map1, map2) {
    if (map1.size < map2.size) return false;
    for (const k of map2.keys()) {
      if (map1.get(k) < map2.get(k)) return false;
      if (!map1.has(k)) return false;
    }
    return true;
  }
  const sLen = s.length;
  const tLen = t.length;

  if (sLen < tLen) return '';

  const tCounter = new Map();
  const counter = new Map();
  let res = '';
  let minLen = sLen;

  for (const c of t) {
    tCounter.set(c, (tCounter.get(c) || 0) + 1);
  }

  let start = 0;
  for (let end = 0; end < sLen; ++end) {
    const c = s.charAt(end);
    counter.set(c, (counter.get(c) || 0) + 1);

    while (start <= end && isValid(counter, tCounter)) {
      const startChar = s.charAt(start);
      const currStr = s.slice(start, end + 1);
      if (currStr.length < res.length || res.length === 0) {
        minLen = currStr.length;
        res = currStr;
      }
      start += 1;
      counter.set(startChar, (counter.get(startChar) || 0) - 1);
      if (counter.get(startChar) <= 0) {
        counter.delete(startChar);
      }
    }
  }
  return res;
};

// to maintain the lexicographical order for the result
function getMinimumWindow(s, t) {
  function isValid(map1, map2) {
    if (map1.size < map2.size) return false;
    for (const k of map2.keys()) {
      if (map1.get(k) < map2.get(k)) return false;
      if (!map1.has(k)) return false;
    }
    return true;
  }
  const sLen = s.length;
  const tLen = t.length;

  if (sLen < tLen) return '';

  const tCounter = new Map();
  const counter = new Map();
  let res = '';
  let minLen = sLen;

  for (const c of t) {
    tCounter.set(c, (tCounter.get(c) || 0) + 1);
  }

  let start = 0;
  for (let end = 0; end < sLen; ++end) {
    const c = s.charAt(end);
    counter.set(c, (counter.get(c) || 0) + 1);

    while (start <= end && isValid(counter, tCounter)) {
      const startChar = s.charAt(start);
      const currStr = s.slice(start, end + 1);
      if (currStr.length <= res.length || res.length === 0) {
        minLen = currStr.length;
        // If two substrings that satisfy the condition has the same length, the one that comes lexicographically first are smaller
        res = res.length === currStr.length && res.localeCompare(currStr) < 0 ? res : currStr;
      }
      start += 1;
      counter.set(startChar, (counter.get(startChar) || 0) - 1);
      if (counter.get(startChar) <= 0) {
        counter.delete(startChar);
      }
    }
  }
  return res;
}

// algomonster solution
function getMinimumWindow(original, check) {
  const checkCount = new Map();
  for (const c of [...check]) {
    if (checkCount.has(c)) {
      checkCount.set(c, checkCount.get(c) + 1);
    } else {
      checkCount.set(c, 1);
    }
  }
  const windowCount = new Map();
  let satisfyCount = 0;
  const originalLen = original.length;
  let start = 0,
    end = 0;
  const matchReq = Array.from(checkCount.keys()).length;
  let smallestStr = null;
  function deltaChar(char, delta) {
    if (!windowCount.has(char)) {
      windowCount.set(char, 0);
    }
    if (windowCount.get(char) >= (checkCount.has(char) ? checkCount.get(char) : 0)) {
      satisfyCount -= 1;
    }
    windowCount.set(char, windowCount.get(char) + delta);
    if (windowCount.get(char) >= (checkCount.has(char) ? checkCount.get(char) : 0)) {
      satisfyCount += 1;
    }
  }
  while (end < originalLen) {
    while (end < originalLen && satisfyCount < matchReq) {
      deltaChar(original.charAt(end), 1);
      end += 1;
    }
    if (end == originalLen && satisfyCount < matchReq) break;
    while (satisfyCount >= matchReq) {
      deltaChar(original.charAt(start), -1);
      start += 1;
    }
    const validWindow = original.slice(start - 1, end);
    if (smallestStr == null || smallestStr.length > validWindow.length) {
      smallestStr = validWindow;
    } else if (smallestStr.length == validWindow.length && validWindow < smallestStr) {
      smallestStr = validWindow;
    }
  }
  return smallestStr == null ? '' : smallestStr;
}
