/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var zigzagLevelOrder = function(root) {
    if (!root) return [];
    const queue = [root];
    const res = [];
    let isReversed = false;
    while (queue.length > 0) {
        const length = queue.length;
        const curr = [];
        for (let i = 0; i < length; ++i) {
            node = queue.shift();
            if (node) {
                curr.push(node.val);
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
        }
        if (isReversed) {
            res.push(curr.reverse());
        } else {
            res.push([...curr]);
        }
        isReversed = !isReversed;
    }
    return res;
};

// algomonster solution
function zigZagTraversal(root) {
    const res = [];
    const queue = [root];  // at least one element in the queue to kick start bfs
    let left_to_right = true;
    while (queue.length > 0) {  // as long as there is element in the queue
        const n = queue.length;  // number of nodes in current level, see explanation above
        const new_level = [];
        for (let i = 0; i < n; i++) {  // dequeue each node in the current level
            const node = queue.shift();
            new_level.push(node.val);
            // enqueue non-null children
            for (const child of [node.left, node.right]) {
                if (child) queue.push(child);
            }
        }
        if (!left_to_right) {
            new_level.reverse();  // reverse current level
        }
        res.push(new_level);
        left_to_right = !left_to_right;  // flip flag
    }
    return res;
}