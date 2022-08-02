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
 * @return {number[]}
 */
 var rightSideView = function(root) {
    if (!root) return [];
    const queue = [root];
    const res = [];
    while (queue.length > 0) {
        const length = queue.length;
        for (let i = 0; i < length; ++i) {
            const node = queue.shift();            
            if (node) {
                if (i == 0) res.push(node.val);
                if (node.right) queue.push(node.right);
                if (node.left) queue.push(node.left);
            }
        }
    }
    return res;
};

// solution
function binaryTreeRightSideView(root) {
    let res = [];
    let queue = [root]; // at least one element in the queue to kick start bfs
    while (queue.length > 0) {  // as long as there is element in the queue
        const n = queue.length;  // number of nodes in current level
        res.push(queue[0].val);  // only append the first node we encounter since it's the rightmost
        for (let i = 0; i < n; i++) {  // dequeue each node in the current level
            const node = queue.shift();
            // we add right children first so it'll pop out of the queue first
            for (const child of [node.right, node.left]) {
                if (child) queue.push(child);
            }
        }
    }
    return res;
}