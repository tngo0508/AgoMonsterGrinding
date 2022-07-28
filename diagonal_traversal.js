/**
 * @param {number[][]} mat
 * @return {number[]}
 */
 var findDiagonalOrder = function(mat) {
    let row = 0, col = 0;
    let res = [];
    let numRow = mat.length;
    let numCol = mat[0].length;
    let upRight = true;
    let n = numRow * numCol;
    while (res.length < n) {
        if (row >= 0 && row < numRow && col >= 0 && col < numCol) {
            res.push(mat[row][col]);    
        } else {
            if (upRight) {
                if (col >= numCol) ++row;
                else if (row < 0) ++col;
            } else {
                if (row >= numRow) ++col;
                else if (col < 0) ++ row;
            }
            upRight = !upRight;
            
        }
        if (upRight) {
            ++col;
            --row;
        } else {
            --col;
            ++row;
        }
    }
    return res;
};