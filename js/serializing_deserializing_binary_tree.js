/* eslint-disable require-jsdoc */
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function serialize(root) {
  // WRITE YOUR BRILLIANT CODE HERE
  if (!root) return 'x';
  const res = [root.val.toString()];
  res.push(serialize(root.left));
  res.push(serialize(root.right));
  return res.join(',');
}

function dfs(arr, idx = [0]) {
  if (idx[0] === arr.length || arr[idx] === 'x') return null;
  const node = new Node(parseInt(arr[idx]));
  ++idx[0];
  node.left = dfs(arr, idx);
  ++idx[0];
  node.right = dfs(arr, idx);
  return node;
}

// solution
function serialize(root) {
  const res = [];
  serialize_dfs(root, res);
  return res.join(' ');
}

function serialize_dfs(root, res) {
  if (!root) {
    res.push('x');
    return;
  }
  res.push(root.val);
  serialize_dfs(root.left, res);
  serialize_dfs(root.right, res);
}

function deserialize(s) {
  // create an iterator that returns a token each time we call `next`
  return deserialize_dfs(s.split(' ')[Symbol.iterator]());
}

function deserialize_dfs(nodes) {
  const val = nodes.next().value;
  if (val === 'x') return;
  const cur = new Node(parseInt(val, 10));
  cur.left = deserialize_dfs(nodes);
  cur.right = deserialize_dfs(nodes);
  return cur;
}
