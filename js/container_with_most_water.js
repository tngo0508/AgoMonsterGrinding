/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function (height) {
  let l = 0;
  let r = height.length - 1;
  let res = Number.NEGATIVE_INFINITY;
  while (l < r) {
    const w = r - l;
    const h = Math.min(height[l], height[r]);
    const currArea = w * h;
    res = Math.max(currArea, res);
    if (height[l] <= height[r]) {
      ++l;
    } else {
      --r;
    }
  }
  return res;
};
