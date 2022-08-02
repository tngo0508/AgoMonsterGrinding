/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
// use bidirectional bfs to avoid TLE
 var minKnightMoves = function(x, y) {
    const queue = [[0, 0, 0]];
    const otherQueue = [[x, y, 0]];
    
    const visited = new Map([
        ['0,0',0],
    ]);
    const otherVisited = new Map([
        [[x,y].join(),0],
    ]);
    
    function* getNeighbors(row, col, dist) {
        const dirs = [[-1,-2],[-2,-1],[-2,1],[-1,2],[1,2],[2,1],[2,-1],[1,-2]];
        for (const [x, y] of dirs) {
            yield [row + x, col + y, dist + 1];
        }
    }
    
    while (true) {
        const [row, col, dist] = queue.shift();
        const currNodeInQueue = [row, col].join();
        if (otherVisited.has(currNodeInQueue)) {
            return dist + otherVisited.get(currNodeInQueue);
        }
        const [otherRow, otherCol, otherDist] = otherQueue.shift();
        const currNodeInOtherQueue = [otherRow, otherCol].join();
        if (visited.has(currNodeInOtherQueue)) {
            return otherDist + visited.get(currNodeInOtherQueue);
        }
        for (const neighbor of getNeighbors(row, col, dist)) {
            const [x, y, z] = neighbor;
            const neighborStr = [x, y].join();
            if (visited.has(neighborStr)) continue;
            visited.set(neighborStr, z);
            queue.push(neighbor);
        }
        for (const neighbor of getNeighbors(otherRow, otherCol, otherDist)) {
            const [x, y, z] = neighbor;
            const neighborStr = [x, y].join();
            if (otherVisited.has(neighborStr)) continue;
            otherVisited.set(neighborStr, z);
            otherQueue.push(neighbor);
        }
    }
};

// algomonster solution - TLE
function getKnightShortestPath(x, y) {
    function bfs(start) {
        const visited = new Set();
        let steps = 0;
        const queue = [start];
        while (queue.length > 0) {
            const n = queue.length;
            for (let i = 0; i < n; i++) {
                const node = queue.shift();
                if (node[0] == y && node[1] == x) return steps;
                for (const neighbor of get_neighbors(node)) {
                    const neighbor_str = neighbor.join(',');
                    if (visited.has(neighbor_str)) continue;
                    queue.push(neighbor);
                    visited.add(neighbor_str);
                }
            }
            steps++;
        }
        return steps;
    }

    function get_neighbors(coord) {
        const res = [];
        const [row, col] = coord;
        const delta_row = [-2, -2, -1, 1, 2, 2, 1, -1];
        const delta_col = [-1, 1, 2, 2, 1, -1, -2, -2];
        for (let i = 0; i < delta_row.length; i++) {
            const r = row + delta_row[i];
            const c = col + delta_col[i];
            res.push([r, c]);
        }
        return res;
    }

    return bfs([0, 0]);
}