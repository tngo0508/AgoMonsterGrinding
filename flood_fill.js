/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
 var floodFill = function(image, sr, sc, color) {
    const numRows = image.length;
    const numCols = image[0].length;
    const oldColor = image[sr][sc];
    if (oldColor === color) return image;
    
    function* getNeighbors(r, c) {
        const direction = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        for (const [x, y] of direction) {
            yield [r + x, c + y];
        }
    }
    
    function bfs(image, queue, color) {
        while (queue.length > 0) {
            const [row, col] = queue.shift();
            if (!(0 <= row && row < numRows) || !(0 <= col && col < numCols)) {
                continue;
            }
            if (image[row][col] === color || image[row][col] !== oldColor) {
                continue;
            }
            image[row][col] = color;
            for (const [r, c] of getNeighbors(row, col)) {
                queue.push([r, c]);
            }
        }
    }
    
    bfs(image, [[sr, sc]], color);
    return image;
};

// algomonster solution
function floodFill(r, c, replacement, image) {
    const num_rows = image.length;
    const num_cols = image[0].length;

    function get_neighbors(coord, color) {
        const neighbors = [];
        const row = coord[0];
        const col = coord[1];
        const delta_row = [-1, 0, 1, 0];
        const delta_col = [0, 1, 0, -1];
        for (let i = 0; i < delta_row.length; i++) {
            const neighbor_row = row + delta_row[i];
            const neighbor_col = col + delta_col[i];
            if (0 <= neighbor_row && neighbor_row < num_rows &&
              0 <= neighbor_col && neighbor_col < num_cols) {
                  if (image[neighbor_row][neighbor_col] === color) {
                      neighbors.push([neighbor_row, neighbor_col]);
                  }
              }
        }
        return neighbors;
    }

    function bfs(root) {
        const queue = [root];
        const visited = Array.from({length: num_rows}, (v, i) => Array(num_cols).fill(false));
        let r = root[0];
        let c = root[1];
        const color = image[r][c];
        image[r][c] = replacement;  // replace root color
        visited[r][c] = true;
        while (queue.length > 0) {
            const node = queue.shift();
            for (const neighbor of get_neighbors(node, color)) {
                r = neighbor[0];
                c = neighbor[1];
                if (visited[r][c]) continue;
                image[r][c] = replacement;  // replace color
                queue.push(neighbor);
                visited[r][c] = true;
            }
        }
    }

    bfs([r, c]);
    return image;
}