/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */

class UnionFind {
  constructor(size) {
    this.root = Array.from({ length: size }, (_, i) => i);
    this.rank = new Array(size).fill(1);
  }

  find(x) {
    if (x === this.root[x]) return x;
    this.root[x] = this.find(this.root[x]);
    return this.root[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX != rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
      { this.root[rootY] = rootX; } else if (this.rank[rootX] < this.rank[rootY]) { this.root[rootX] = rootY; } else {
        this.root[rootY] = rootX;
        this.rank[rootX] += 1;
      }
    }
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}
const validPath = function (n, edges, source, destination) {
  function dfs(src, dst, graph, visited) {
    // TLE - time limit exceeded
    if (src === dst) return true;
    for (const neighbor of graph.get(src)) {
      if (visited[neighbor]) continue;
      visited[neighbor] = true;
      if (dfs(neighbor, dst, graph, visited)) {
        return true;
      }
      visited[neighbor] = false;
    }
    return false;
  }

  function bfs(src, dst, graph, visited) {
    const queue = [src];
    while (queue.length > 0) {
      const node = queue.shift();
      if (node === dst) return true;
      for (const neighbor of graph.get(node)) {
        if (visited[neighbor]) continue;
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
    return false;
  }

  const union = new UnionFind(n);
  const graph = new Map();
  for (let i = 0; i < n; ++i) {
    graph.set(i, []);
  }
  for (const edge of edges) {
    graph.get(edge[0]).push(edge[1]);
    graph.get(edge[1]).push(edge[0]);
    union.union(edge[0], edge[1]);
  }
  const visited = new Array(n).fill(false);
  visited[source] = true;
  // return bfs(source, destination, graph, visited);
  return union.connected(source, destination);
};
