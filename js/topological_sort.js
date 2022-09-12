function countParents(graph) {
  const counts = new Map();
  for (let node of graph.keys()) {
    counts.set(node, 0);
  }
  for (let parent of graph.keys()) {
    for (node of graph.get(parent)) {
      counts.set(node, counts.get(node) + 1);
    }
  }
  return counts;
}

function topoSort(graph) {
  const res = [];
  const q = [];
  const counts = countParents(graph);
  for (let node of counts.keys()) {
    if (counts.get(node) == 0) {
      q.push(node);
    }
  }
  while (q.length > 0) {
    const node = q.shift();
    res.push(node);
    for (let child of graph.get(node)) {
      counts.set(child, counts.get(child) - 1);
      if (counts.get(child) == 0) {
        q.push(child);
      }
    }
  }
  return graph.size === res.length ? res : null;
}
