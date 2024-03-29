/**
 * @param {number[][]} mat
 * @return {number[]}
 * the idea is to know when to determine how to move diagonal up right or bottom left
 * to move up and right, we just need to do row - 1 and col + 1
 * to move bottom and left, we do row + 1 and col - 1
 * when the index is out of bound, we need to reset the index for the next iteration properly
 * for example,
 *
 *     #   #
 *   1 2 3
 *   4 5 6
 * # 7 8 9
 *   #
 *
 *  the # is where we reach the out of bound position, so
 *  if we are moving in the direction up and right:
 *      we check for col first, if it's out of bound, we move the row down
 *      otherwise, we check for row, if row is out of bound, just move the col to the right
 *  if we are moving in the direction bottom and left:
 *      do the same thing, but check the col first, then row
 */
const findDiagonalOrder = function (mat) {
  let row = 0;
  let col = 0;
  const res = [];
  const numRow = mat.length;
  const numCol = mat[0].length;
  let upRight = true;
  const n = numRow * numCol;
  while (res.length < n) {
    if (row >= 0 && row < numRow && col >= 0 && col < numCol) {
      res.push(mat[row][col]);
    } else {
      if (upRight) {
        if (col >= numCol) {
          ++row;
        } // check for col first because when we reach the top right corner, we don't want to move col to the right, only move down
        else if (row < 0) ++col;
      } else if (row >= numRow) {
        ++col;
      } // check for row first because when we reach the left bottom corner, we only want to move the right
      else if (col < 0) ++row;
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
