function taskScheduling(tasks, requirements) {
    // WRITE YOUR BRILLIANT CODE HERE
    let indegree = new Map();
    let queue = [];
    let res = [];
    let graph = new Map();
    for (const task of tasks) {
        indegree.set(task, 0);
        graph.set(task, []);
    }
    for (const [src, dst] of requirements) {
        indegree.set(dst, indegree.get(dst) + 1);
        graph.get(src).push(dst);
    }
    for (const node of indegree.keys()) {
        if (indegree.get(node) === 0) {
            queue.push(node);
        }
    }
    
    while (queue.length > 0) {
        const node = queue.shift();
        res.push(node);
        for (const neighbor of graph.get(node)) {
            indegree.set(neighbor, indegree.get(neighbor) - 1);
            if (indegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return (graph.size === res.length) ? res : null;
}

// algomonster solution
function countParents(graph) {
    const counts = new Map();
    for (const node of graph.keys()) {
        counts.set(node, 0);
    }
    for (const parent of graph.keys()) {
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
    for (const node of counts.keys()) {
        if (counts.get(node) == 0) {
            q.push(node);
        }
    }
    while (q.length > 0) {
        const node = q.shift();
        res.push(node);
        for (const child of graph.get(node)) {
            counts.set(child, counts.get(child) - 1);
            if (counts.get(child) == 0) {
                q.push(child);
            }
        }
    }
    return (graph.size === res.length) ? res : null;
}

function taskScheduling(tasks, requirements) {
    const graph = new Map();
    for (let task of tasks) {
        graph.set(task, []);
    }
    for (let req of requirements) {
        graph.get(req[0]).push(req[1]);
    }
    return topoSort(graph);
}