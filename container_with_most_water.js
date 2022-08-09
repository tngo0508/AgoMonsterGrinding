/**
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function(height) {
    let l = 0, r = height.length - 1;
    let res = Number.NEGATIVE_INFINITY;
    while (l < r) {
        let w = r - l;
        let h = Math.min(height[l], height[r]);
        let currArea = w * h;
        res = Math.max(currArea, res);
        if (height[l] <= height[r]) {
            ++l;
        } else {
            --r;
        }
    }
    return res;
};