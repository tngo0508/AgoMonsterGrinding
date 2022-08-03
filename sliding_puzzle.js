/**
 * @param {number[][]} board
 * @return {number}
 */
 var slidingPuzzle = function(board) {
    const equals = (a, b) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < 2; ++i) {
            for (let j = 0; j < 3; ++j) {
                if (a[i][j] !== b[i][j]) return false;
            }
        }
        return true;
    };
    const target = [[1,2,3],[4,5,0]];
    let queue = [[board, 0]];
    let visited = new Set();
    visited.add(board.toString());
    function getZeroPos(state) {
        for (let i = 0; i < 2; ++i) {
            for (let j = 0; j < 3; ++j) {
                if (state[i][j] === 0) return [i, j];
            }
        }
    }
    
    function* getNeighbor(state, moves) {
        const direction = [[0,1],[1,0],[0,-1],[-1,0]];
        let [row, col] = getZeroPos(state);
        for (const [x, y] of direction) {
            const r = row + x;
            const c = col + y;
            if (!(0 <= r && r < 2) || !(0 <= c && c < 3)) continue;
            [state[r][c], state[row][col]] = [state[row][col], state[r][c]];
            yield [JSON.parse(JSON.stringify(state)), moves + 1]; // make deepcopy
            [state[r][c], state[row][col]] = [state[row][col], state[r][c]];
        }
    }
    
    while (queue.length > 0) {
        const [node, moves] = queue.shift();
        if (equals(node, target)) return moves;
        for (const neighbor of getNeighbor(node, moves)) {
            const neighborStr = neighbor[0].toString();
            if (visited.has(neighborStr)) continue;
            queue.push(neighbor);
            visited.add(neighborStr);
        }
    }
    return -1;
};

// algomonster solution
const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const target = 123450;  // The serialized value of [[1, 2, 3], [4, 5, 0]]

function serialize(position) {
    let total = 0;
    for (let line of position) {
        for (let entry of line) {
            total *= 10;
            total += entry;
        }
    }
    return total;
}

function deserialize(state) {
    const result = [];
    result.push([]);
    result.push([]);
    for (let i = 1; i >= 0; i--) {
        for (let j = 2; j >= 0; j--) {
            const exponent = i * 3 + j;
            const digit = Math.floor(state / Math.round(Math.pow(10, exponent))) % 10;
            result[1 - i].push(digit);
        }
    }
    return result;
}

function numSteps(initPos) {
    const initState = serialize(initPos);
    if (initState == target) return 0;
    const movesMap = new Map();
    const movesQueue = [];
    movesMap.set(initState, 0);
    movesQueue.push(initState);
    while (movesQueue.length > 0) {
        const topState = movesQueue.shift();
        let row = 0, col = 0;
        const topPosition = deserialize(topState);
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                if (topPosition[i][j] == 0) {
                    row = i;
                    col = j;
                }
            }
        }
        for (let [deltaRow, deltaCol] of directions) {
            const newRow = row + deltaRow;
            const newCol = col + deltaCol;
            if (newRow >= 0 && newRow < 2 && newCol >= 0 && newCol < 3) {
                const newPosition = deserialize(topState);
                newPosition[row][col] = topPosition[newRow][newCol];
                newPosition[newRow][newCol] = topPosition[row][col];
                const newState = serialize(newPosition);
                if (!movesMap.has(newState)) {
                    movesMap.set(newState, movesMap.get(topState) + 1);
                    movesQueue.push(newState);
                    if (newState == target) {
                        return movesMap.get(newState);
                    }
                }
            }
        }
    }
    return -1;
}