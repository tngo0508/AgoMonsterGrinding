class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function binaryTreeMinDepth(root) {
    // WRITE YOUR BRILLIANT CODE HERE
    if (!root) return 0;
    const queue = [[root, 0]];
    while (queue.length > 0) {
        const [node, level] = queue.shift();
        if (node && !node.left && !node.right) {
           return level;
        }
        if (node) {
            if (node.left) queue.push([node.left, level + 1]);
            if (node.right) queue.push([node.right, level + 1]);
        }
    }
    return 0;
}

// solution
function binaryTreeMinDepth(root) {
    const queue = [root];  // at least one element in the queue to kick start bfs
    let depth = -1;  // we start from -1 because popping root will add 1 depth
    while (queue.length > 0) {  // as long as there is element in the queue
        depth++;
        const n = queue.length;  // number of nodes in current level
        for (let i = 0; i < n; i++) {  // dequeue each node in the current level
            const node = queue.shift();
            if (!node.left && !node.right) {
                return depth; // found leaf node, early return
            }
            for (const child of [node.left, node.right]) {
                if (child) queue.push(child);
            }
        }
    }
    return depth;
}