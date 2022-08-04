function sequenceReconstruction(original, seqs) {
    // WRITE YOUR BRILLIANT CODE HERE
    function equals(a,b) {
        if (a.length !== b.length) return false;
        a.sort();
        b.sort();
        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
    
    let indegree = new Map();
    let graph = new Map();
    let res = [];
    let queue = [];
    for (const node of original) {
        indegree.set(node, 0);
        graph.set(node, new Set());
    }
    for (let seq of seqs) {
        for (i = 0; i < seq.length - 1; i++) { // do this since seq can have more than 2 elements
            const a = seq[i], b = seq[i + 1];
            if (!graph.get(a).has(b)) {
                indegree.set(b, indegree.get(b) + 1);
                graph.get(a).add(b);
            }
        }
    }
    
    for (const node of graph.keys()) {
        if (indegree.get(node) === 0) {
            queue.push(node);
        }
    }
 
    while (queue.length > 0) {
        if (queue.length > 1) return false;
        const node = queue.shift();
        res.push(node);
        for (const neighbor of graph.get(node)) {
            indegree.set(neighbor, indegree.get(neighbor) - 1);
            if (indegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return equals(res, original);
}

// algomonster solution
function sequenceReconstruction(original, seqs) {
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

    function equals(arr1, arr2) {
        if (arr1.length != arr2.length) return false;
        arr1.sort();
        arr2.sort();
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) return false;
        }
        return true;
    }
    
    function topoSort(graph) {
        const seq = [];
        const q = [];
        const counts = countParents(graph);
        for (let node of counts.keys()) {
            if (counts.get(node) == 0) {
                q.push(node);
            }
        }
        while (q.length > 0) {
            // if there's > 1 item, then the recontruction is not unique
            if (q.length > 1) return false;
            const node = q.shift();
            seq.push(node);
            for (let child of graph.get(node)) {
                counts.set(child, counts.get(child) - 1);
                if (counts.get(child) == 0) {
                    q.push(child);
                }
            }
        }
        return equals(seq, original);
    }

    const graph = new Map();
    for (let i = 1; i <= original.length; i++) {
        graph.set(i, new Set());
    }
    for (let seq of seqs) {
        for (i = 0; i < seq.length - 1; i++) {
            const earlyNum = seq[i], lateNum = seq[i + 1];
            if (!graph.get(earlyNum).has(lateNum)) {
                graph.get(earlyNum).add(lateNum);
            }
        }
    }
    return topoSort(graph);
}