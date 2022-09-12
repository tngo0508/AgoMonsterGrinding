function taskScheduling2(tasks, times, requirements) {
  const buildGraph = (tasks, times, requirements) => {
    let graph = new Map();
    for (const task of tasks) {
      graph.set(task, new Set());
    }
    for (const requirement of requirements) {
      const a = requirement[0];
      const b = requirement[1];
      graph.get(a).add(b);
    }
    return graph;
  };
  const buildIndegree = (tasks, times, requirements) => {
    let indegree = new Map();
    for (const task of tasks) {
      indegree.set(task, 0);
    }
    for (const requirement of requirements) {
      const b = requirement[1];
      indegree.set(b, indegree.get(b) + 1);
    }
    return indegree;
  };
  const buildTimeMap = (tasks, times) => {
    let timeMap = new Map();
    for (let i = 0; i < tasks.length; ++i) {
      timeMap.set(tasks[i], times[i]);
    }
    return timeMap;
  };
  const topo_sort = (indegree, graph, timeMap, updatedTime) => {
    let queue = [];
    let res = 0;
    for (const node of indegree.keys()) {
      if (indegree.get(node) === 0) {
        queue.push(node);
      }
    }
    while (queue.length > 0) {
      const length = queue.length;
      for (let i = 0; i < length; ++i) {
        const node = queue.shift();
        res = Math.max(res, updatedTime.get(node));
        for (const neighbor of graph.get(node)) {
          indegree.set(neighbor, indegree.get(neighbor) - 1);
          updatedTime.set(neighbor, Math.max(timeMap.get(neighbor) + updatedTime.get(node), updatedTime.get(neighbor)));
          if (indegree.get(neighbor) === 0) {
            queue.push(neighbor);
          }
        }
      }
    }
    return res;
  };

  let indegree = buildIndegree(tasks, times, requirements);
  let graph = buildGraph(tasks, times, requirements);
  const timeMap = buildTimeMap(tasks, times); // import to create this because we need it to update the time map while traversing the graph
  let updatedTime = new Map(timeMap);

  return topo_sort(indegree, graph, timeMap, updatedTime);
}

// algomonster solution
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

function topoSort(graph, taskTimes) {
  let ans = 0;
  const q = [];
  const dis = new Map();
  for (let node of graph.keys()) {
    dis.set(node, 0);
  }
  const counts = countParents(graph);
  for (let node of counts.keys()) {
    if (counts.get(node) == 0) {
      q.push(node);
      dis.set(node, taskTimes.get(node));
      ans = Math.max(ans, dis.get(node));
    }
  }
  while (q.length > 0) {
    const node = q.shift();
    for (let child of graph.get(node)) {
      counts.set(child, counts.get(child) - 1);
      dis.set(child, Math.max(dis.get(child), dis.get(node) + taskTimes.get(child)));
      ans = Math.max(ans, dis.get(child));
      if (counts.get(child) == 0) {
        q.push(child);
      }
    }
  }
  return ans;
}

function taskScheduling2(tasks, times, requirements) {
  const graph = new Map();
  const taskTimes = new Map();
  for (let i = 0; i < tasks.length; i++) {
    graph.set(tasks[i], []);
    taskTimes.set(tasks[i], times[i]);
  }
  for (let req of requirements) {
    graph.get(req[0]).push(req[1]);
  }
  return topoSort(graph, taskTimes);
}
