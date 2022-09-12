/**
 * @param {number[]} height
 * @return {number}
 */
 var trap = function(height) {
    if (height.length < 2) return 0;
    let start = 0;
    let res = 0;
    for (let end = 1; end < height.length; ++end) {
        if (height[start] === 0 && height[end] > 0) start += 1;
        if (height[start] > height[end]) continue;
        const h = height[start];
        while (start < end) {
            const val = h - height[start];
            res += (val > 0? val: 0);
            start += 1;
        }
    }
    
    if (start < height.length && height[start] > height[height.length - 1]) {
        const arr = height.slice(start).reverse();
        start = 0;
        for (let end = 1; end < arr.length; ++end) {
            if (arr[start] === 0 && arr[end] > 0) start += 1;
            if (arr[start] > arr[end]) continue;
            const h = arr[start];
            while (start < end) {
                const val = h - arr[start];
                res += (val > 0? val: 0);
                start += 1;
        }
    }
    }
    return res;
};