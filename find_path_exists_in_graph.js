/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
 var validPath = function(n, edges, source, destination) {
    function dfs(src, dst, graph, visited) { // TLE - time limit exceeded
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
      let queue = [src];
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
    
    const graph = new Map();
    for (let i = 0; i < n; ++i) {
      graph.set(i, []);
    }
    for (const edge of edges) {
      graph.get(edge[0]).push(edge[1]);
      graph.get(edge[1]).push(edge[0]);
    }
    const visited = new Array(n).fill(false);
    visited[source] = true;
    return bfs(source, destination, graph, visited);
  };