/**
 * @param {character[][]} grid
 * @return {number}
 */
 var numIslands = function(grid) {
    const numRows = grid.length;
    const numCols = grid[0].length;
    let numIslands = 0;
    
    function* getNeighbors(row, col) {
        const direction = [[0, 1],[0,-1],[1,0],[-1,0]];
        for (const [x, y] of direction) {
            yield [row + x, col + y];
        }
    }
    
    function bfs(row, col) {
        const queue = [[row, col]];
        while (queue.length > 0) {
            const [r, c] = queue.shift();
            if (!(0 <= r && r < numRows) || !(0 <= c && c < numCols)) {
                continue;
            }
            if (grid[r][c] === "0") {
                continue;
            }
            grid[r][c] = "0";
            for (const neighbor of getNeighbors(r, c)) {
                queue.push(neighbor);
            }
        }
    }
    
    for (let i = 0; i < numRows; ++i) {
        for (let j = 0; j < numCols; ++j) {
            if (grid[i][j] === "1") {
                bfs(i, j);
                ++numIslands;
            }
        }
    }
    return numIslands;
};

// solution
function countNumberOfIslands(grid) {
    const num_rows = grid.length;
    const num_cols = grid[0].length;

    function getNeighbors(coord) {
        const res = [];
        const [row, col] = coord;
        const delta_row = [-1, 0, 1, 0];
        const delta_col = [0, 1, 0, -1];
        for (let i = 0; i < delta_row.length; i++) {
            const r = row + delta_row[i];
            const c = col + delta_col[i];
            if (0 <= r && r < num_rows && 0 <= c && c < num_cols) {
                res.push([r, c]);
            }
        }
        return res;
    }

    function bfs(start) {
        const queue = [start];
        const [r, c] = start;
        grid[r][c] = 0;
        while (queue.length > 0) {
            const node = queue.shift();
            for (const neighbor of getNeighbors(node)) {
                const [r, c] = neighbor;
                if (grid[r][c] === 0) continue;
                queue.push(neighbor);
                grid[r][c] = 0;
            }
        }
    }

    let count = 0;
    // bfs starting from each unvisited land cell
    for (let r = 0; r < num_rows; r++) {
        for (let c = 0; c < num_cols; c++) {
            if (grid[r][c] === 0) continue;
            bfs([r, c]);
            // bfs would find 1 connected island, increment count
            count++;
        }
    }
    return count;
}