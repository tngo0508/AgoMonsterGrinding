/*
* Given a ternary tree (each node of the tree has at most three children), find all root-to-leaf paths.

                 1
               / | \
              2  4  5
             /
            3   

            [
                1->2->3,
                1->4,
                1->5
            ]
*/
class Node {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

function ternaryTreePaths(root) {
  // WRITE YOUR BRILLIANT CODE HERE
  const res = [];
  function dfs(node, curr) {
    curr.push(node.val);
    for (const child of node.children) {
      dfs(child, curr);
    }
    if (node.children.length === 0) res.push(curr.join('->'));
    curr.pop();
  }

  dfs(root, []);
  return res;
}

// solution
function dfs(root, path, res) {
  // exit condition, reached leaf node, append paths to results
  if (root.children.length === 0) {
    path.push(root.val);
    const cur_path = path.join('->');
    res.push(cur_path);
    return;
  }
  // dfs on each non-null child
  for (const child of root.children) {
    if (child) {
      const path_copy = Array.from(path);
      path_copy.push(root.val);
      dfs(child, path_copy, res);
    }
  }
}

function ternaryTreePaths(root) {
  let res = [];
  if (root) dfs(root, [], res);
  return res;
}
// solution improve space
function dfs(root, path, res) {
  // exit condition, reached leaf node, append paths to results
  if (root.children.length === 0) {
    path.push(root.val);
    const cur_path = path.join('->');
    res.push(cur_path);
    path.pop();
    return;
  }
  // dfs on each non-null child
  for (const child of root.children) {
    if (child) {
      path.push(root.val);
      dfs(child, path, res);
      path.pop();
    }
  }
}

function ternaryTreePaths(root) {
  let res = [];
  if (root) dfs(root, [], res);
  return res;
}
