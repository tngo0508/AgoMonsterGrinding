/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
 var serialize = function(root) {
    if (!root) return 'x';
    let res = [root.val.toString()];
    res.push(serialize(root.left));
    res.push(serialize(root.right));
    return res.join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */

function buildTree(arr, idx = {val:0}) {
    if (arr.length === idx.val || arr[idx.val] === 'x') {
        return null;
    }
    let node = new TreeNode(parseInt(arr[idx.val]));
    ++idx.val;
    node.left = buildTree(arr, idx);
    ++idx.val;
    node.right = buildTree(arr, idx);
    return node;
}

var deserialize = function(data) {
    const arr = data.split(',');
    return buildTree(arr);
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */