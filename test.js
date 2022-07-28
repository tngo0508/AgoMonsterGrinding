class LinkedListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}


class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class NaryTreeNode {
    constructor(val) {
        this.val = val;
        this.children = [];
    }
}

const MAX_VALUE = Number.POSITIVE_INFINITY;
const MIN_VAlUE = Number.NEGATIVE_INFINITY;