/**
 * @param {string[]} words
 * @return {string}
 */
 var alienOrder = function(words) {
    function buildGraph(edges, indegree, graph) {
        for (const edge of edges) {
            const arr = edge.split(',');
            const src = arr[0];
            const dst = arr[1];
            graph.get(src).push(dst);
            indegree.set(dst, indegree.get(dst) + 1);
        }
    }
    
    function topo_sort(indegree, graph) {
        let res = [];
        let queue = [];
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
        
        return (res.length === indegree.size? res.join("") : "");
    }
    
    let edges = new Set();
    let graph = new Map();
    let indegree = new Map();
    for (let i = 0; i < words.length - 1; ++i) {
        const word1 = words[i];
        const word2 = words[i + 1];
        const length = Math.min(word1.length, word2.length);
        let found = false;
        for (let j = 0; j < length; ++j) {
            const c1 = word1[j];
            const c2 = word2[j];
            if (c1 !== c2) {
                edges.add([c1, c2].toString());               
                found = true;
                break;
            }  
        }
        // check for edge case invalid order, ex: apple before app
        if (!found) {
            if (word1.length > word2.length) {
                return "";
            }
        }
    }
    for (const word of words) {
        for (const c of word) {
            if (graph.has(c)) continue;
            graph.set(c, []);
            indegree.set(c, 0);
        }
    }
    buildGraph(edges, indegree, graph);
    
    return topo_sort(indegree, graph);
};

