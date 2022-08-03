/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
 var ladderLength = function(beginWord, endWord, wordList) {
    function buildGraph(beginWord, endWord, words) {
        let graph = new Map();
        for (const word of words) {
            for (let i = 0; i < word.length; ++i) {
                const currString = word.slice(0, i) + '*' + word.slice(i + 1);
                if (graph.has(currString)) {
                    graph.get(currString).push(word);
                } else {
                    graph.set(currString, [word]);
                }
            }
        }
        return graph;
    }    
    function* getNeighbor(word, graph, level) {
        for (let i = 0; i < word.length; ++i) {
            const node = word.slice(0, i) + '*' + word.slice(i + 1);
            if (graph.has(node)) {
                for (const neighbor of graph.get(node)) {
                    yield [neighbor, level + 1];
                }
            }
        }
    }
    
    function bfs(beginWord, endWord, graph) {
        const queue = [[beginWord, 0]];
        const visited = new Set();
        while (queue.length > 0) {
            const [node, level] = queue.shift();
            if (node === endWord) return level + 1;
            for (const neighbor of getNeighbor(node, graph, level)) {
                if (visited.has(neighbor[0])) continue;
                visited.add(neighbor[0]);
                queue.push(neighbor);
            }
        }
        return 0;
    }
    
    const graph = buildGraph(beginWord, endWord, wordList);
    return bfs(beginWord, endWord, graph);
};

// algomonster solution
const alphabet = "abcdefghijklmnopqrstuvwxyz";

function wordLadder(begin, end, wordList) {
    const words = new Set(wordList);  // make a set because existence query is O(1) vs O(N) for list
    const queue = [begin];
    let distance = 0;
    while (queue.length > 0) {
        const n = queue.length;
        distance++;
        for (let i = 0; i < n; i++) {
            const word = queue.shift();
            for (let j = 0; j < word.length; j++) {
                for (const letter of alphabet) {
                    const next_word = word.slice(0, j) + letter + word.slice(j+1);
                    if (!words.has(next_word)) continue;
                    if (next_word === end) return distance;
                    queue.push(next_word);
                    // removing from the set is equivalent as marking the word visited
                    words.delete(next_word);
                }
            }
        }
    }
    return 0;
}