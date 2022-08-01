class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function insertBst(bst, val) {
    // WRITE YOUR BRILLIANT CODE HERE
    if (!bst) return new Node(val);
    if (bst.val > val) bst.left = insertBst(bst.left, val);
    else if (bst.val < val) bst.right = insertBst(bst.right, val);
    return bst;
}

// solution
function insertBst(bst, val) {
    if (bst == null) return new Node(val);
    if (bst.val < val) {
        bst.right = insertBst(bst.right, val);
    } else if (bst.val > val) {
        bst.left = insertBst(bst.left, val);
    }
    return bst;
}