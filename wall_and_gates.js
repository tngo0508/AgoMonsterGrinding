/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
 const INF = 2147483647;
 const GATE = 0;
 const OBSTACLE = -1;
  
 var wallsAndGates = function(rooms) {
     const numRows = rooms.length;
     const numCols = rooms[0].length;
     const queue = [];
     const visited = new Set();
     
     function* getNeighbor(row, col, distance) {
         const direction = [[0,1],[1,0],[0,-1],[-1,0]];
         for (const [x, y] of direction) {
             const r = row + x;
             const c = col + y;
             if (!(0 <= r && r < numRows) || !(0 <= c && c < numCols)) {
                 continue;
             }
             if (rooms[r][c] === OBSTACLE) continue;
             if (rooms[r][c] === GATE) continue;
             yield [row + x, col + y, distance + 1];
         }
     }
     
     function bfs(queue, rooms, visited) {
         while (queue.length > 0) {
             const [row, col, distance] = queue.shift();
             if (rooms[row][col] !== GATE && rooms[row][col] !== INF) {
                 rooms[row][col] = Math.min(rooms[row][col], distance)
             } else {
                 rooms[row][col] = distance;
             }
             for (const neighbor of getNeighbor(row, col, distance)) {
                 const [x, y, d] = neighbor;
                 const neighborStr = [x, y].join();
                 if (visited.has(neighborStr)) continue;
                 queue.push(neighbor);
                 visited.add(neighborStr);
             }
         }
     }
     
     for (let i = 0; i < numRows; ++i) {
         for (let j = 0; j < numCols; ++j) {
             if (rooms[i][j] === GATE) {
                 queue.push([i, j, 0]);
                 visited.add([i,j].join());
             }
         }
     }
     
     bfs(queue, rooms, visited);
 };

 // algomonster solution
const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
// const INF = 2147483647;

function mapGateDistances(dungeonMap) {
    const queue = [];
    const n = dungeonMap.length, m = dungeonMap[0].length;
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < m; col++) {
            if (dungeonMap[row][col] == 0) {
                queue.push([row, col]);
            }
        }
    }
    while (queue.length > 0) {
        let [row, col] = queue.shift();
        for (const [deltaRow, deltaCol] of directions) {
            const totalRow = row + deltaRow;
            const totalCol = col + deltaCol;
            if (totalRow >= 0 && totalRow < n && totalCol >= 0 && totalCol < m) {
                if (dungeonMap[totalRow][totalCol] == INF) {
                    dungeonMap[totalRow][totalCol] = dungeonMap[row][col] + 1;
                    queue.push([totalRow, totalCol]);
                }
            }
        }
    }
    return dungeonMap;
}