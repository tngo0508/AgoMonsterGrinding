/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
 var canFinish = function(numCourses, prerequisites) {
    let indegree = new Map();
    let graph = new Map();
    let queue = [];
    let res = new Set();
    for (let i = 0; i < numCourses; ++i) {
        indegree.set(i, 0);
        graph.set(i, []);
    }
    for (const prereq of prerequisites) {
        const src = prereq[0];
        const dst = prereq[1];
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
        if (res.has(node)) return false;
        res.add(node);
        for (const neighbor of graph.get(node)) {
            indegree.set(neighbor, indegree.get(neighbor) - 1);
            if (indegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }
    return res.size === indegree.size;
};

// dfs approach
var canFinish = function(numCourses, prerequisites) {
    function dfs(graph, states, start) {
        states[start] = State.VISTING;
        for (const neighbor of graph.get(start)) {
            if (states[neighbor] === State.VISTING) return false;
            if (states[neighbor] === State.VISITED) continue;
            if (states[neighbor] === State.TO_VISIT) {
                if (!dfs(graph, states, neighbor)) {
                    return false;
                }   
            }
        }
        states[start] = State.VISITED;
        return true;
    }
    const State = Object.freeze({
        TO_VISIT: 0,
        VISTING: 1,
        VISITED: 2
    });
    const states = Array(numCourses).fill(State.TO_VISIT);
    const graph = new Map();
    for (let i = 0; i < numCourses; ++i) {
        graph.set(i, []);
    }
    for (const prereq of prerequisites) {
        graph.get(prereq[0]).push(prereq[1]);
    }
    for (let i = 0; i < numCourses; ++i) {
        if(!dfs(graph, states, i)) return false;
    }
    return true;
};