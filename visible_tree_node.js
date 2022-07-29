class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function visibleTreeNode(root) {
    // WRITE YOUR BRILLIANT CODE HERE
    const dfs = function(node, maxVal) {
        if (!node) return 0;
        maxVal = Math.max(maxVal, node.val)
        return (node.val >= maxVal) + dfs(node.left, maxVal) + dfs(node.right, maxVal);
    }
    return dfs(root, root.val);
}


/**
 * Algomonster solution
 */
 function dfs(root, max_sofar) {
    if (!root) return 0;
    let total = 0;
    if (root.val >= max_sofar) total++;

    // max_sofar for child node is the larger of previous max and current node val
    total += dfs(root.left, Math.max(max_sofar, root.val));
    total += dfs(root.right, Math.max(max_sofar, root.val));

    return total;
}

function visibleTreeNode(root) {
    // start max_sofar with smallest number possible so any value root has is greater than it
    return dfs(root, Number.NEGATIVE_INFINITY);
}