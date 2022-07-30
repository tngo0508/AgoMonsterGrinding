class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function validBst(root) {
    // WRITE YOUR BRILLIANT CODE HERE
    function helper(node, lo = Number.NEGATIVE_INFINITY, hi = Number.POSITIVE_INFINITY) {
        if (!node) return true;
        if (node.val > hi || node.val < lo) return false;
        return helper(node.left, lo, node.val) && helper(node.right, node.val, hi);
    }
    return helper(root);
}

// solution
function validBst(root) {
    function dfs(root, min_val, max_val) {
        // empty nodes are always valid
        if (!root) return true;

        if (!(min_val <= root.val && root.val <= max_val)) return false;

        // see notes below
        return dfs(root.left, min_val, root.val) && dfs(root.right, root.val, max_val);
    }
    return dfs(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY) // root is always valid
}