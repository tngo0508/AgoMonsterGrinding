function binarySearch(arr, target) {
    // WRITE YOUR BRILLIANT CODE HERE
    let l = 0, 
        r = arr.length - 1,
        m = 0;
    while (l <= r) {
        m = l + Math.floor((r - l) / 2);
        if (target === arr[m]) {
            return m;
        }
        else if (target > arr[m]) {
            l = m + 1;
        }
        else {
            r = m - 1;
        }
    }
    return -1;
}

binarySearch([2,8,89,120,1000], 120)