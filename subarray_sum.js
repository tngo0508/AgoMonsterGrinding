function subarraySum(arr, target) {
    // WRITE YOUR BRILLIANT CODE HERE
    let prefixSum = new Map();
    prefixSum.set(0, 0);
    let runningSum = 0;
    for (let i = 0; i < arr.length; ++i) {
        runningSum += arr[i];
        const comp = runningSum - target;
        if (prefixSum.has(comp)) {
            return [prefixSum.get(comp), i + 1];
        }
        prefixSum.set(runningSum, i + 1);
    }
    return [];
}

// solution
function subarraySum(arr, target) {
    // prefix_sum 0 happens when we have an empty array
    const prefixSums = new Map([[0, 0]]);
    let curSum = 0;
    for (let i = 0; i < arr.length; i++) {
        curSum += arr[i];
        const complement = curSum - target;
        if (prefixSums.has(complement)) {
            return [prefixSums.get(complement), i + 1];
        }
        prefixSums.set(curSum, i + 1);
    }
}
