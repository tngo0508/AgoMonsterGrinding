function find_boundary(arr) {
    // WRITE YOUR BRILLIANT CODE HERE
    // let l = 0, r = arr.length - 1;
    // let result = -1;
    // while (l <= r) {
    //     m = l + Math.floor((r - l) / 2);
    //     if (arr[m]) {
    //         r = m - 1;
    //         result = m;
    //     } else {
    //         l = m + 1
    //     }
    // }

    // return result;


    // template leetcode
    let l = 0, r = arr.length - 1;
    while (l < r) {
        m = l + Math.floor((r - l) / 2);
        if (arr[m]) {
            r = m;
        } else {
            l = m + 1;
        }
    }
    return (arr[r]? r: -1);
}