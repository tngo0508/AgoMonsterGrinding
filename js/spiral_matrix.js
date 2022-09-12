/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var spiralOrder = function(matrix) {
    let numRow = matrix.length;
    let numCol = matrix[0].length;
    let row = 0, col = 0;
    let res = []
    let numOfElements = numRow * numCol;
    while (true) {
        for (let i = col; i < numCol - col; ++i) {
            res.push(matrix[row][i]);
        }
        for (let i = row + 1; i < numRow - row; ++i) {
            res.push(matrix[i][numCol - col - 1]);
        }
        if (res.length === numOfElements) {
            break;
        }
        for (let i = numCol - col - 2; i >= col; --i) {
            res.push(matrix[numRow - row - 1][i]);
        }
        for (let i = numRow - row - 2; i > row; --i) {
            res.push(matrix[i][col]);
        }
        
        if (res.length === numOfElements) {
            break;
        }
        ++col;
        ++row;
    }
    return res;
};