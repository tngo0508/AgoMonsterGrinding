# my solution
class Solution:
    def slidingPuzzle(self, board: List[List[int]]) -> int:
        def get_zero_pos(state):
            for i in range(2):
                for j in range(3):
                    if state[i][j] == 0:
                        return (i, j)
            return (-1, -1)
            
            
        def get_next_state(state):
            state = list(list(row) for row in state)
            r, c = get_zero_pos(state)
            directions = [(1,0),(0,1),(-1,0),(0,-1)]
            for x, y in directions:
                newR, newC = r + x, c + y
                if not 0 <= newR < 2 or not 0 <= newC < 3:
                    continue
                state[r][c], state[newR][newC] = state[newR][newC], state[r][c]
                yield tuple(tuple(row) for row in state)
                state[r][c], state[newR][newC] = state[newR][newC], state[r][c]
            
            
        queue = deque([(tuple(tuple(row) for row in board), 0)])
        visited = set(tuple(tuple(row) for row in board))
        final_state = tuple(tuple(row) for row in [[1,2,3],[4,5,0]])
        
        
        while queue:
            state, step = queue.popleft()
            if state == final_state:
                return step
            for next_state in get_next_state(state):
                if next_state in visited:
                    continue
                queue.append((next_state, step + 1))
                visited.add(next_state)
        
        return -1

# algomonster solution
from collections import deque
from typing import List

directions = [(1, 0), (0, 1), (-1, 0), (0, -1)]

target = ((1, 2, 3), (4, 5, 0))

def num_steps(init_pos: List[List[int]]) -> int:
    init_pos = tuple(tuple(line) for line in init_pos)
    if init_pos == target:
        return 0
    moves_map = {init_pos: 0}
    moves_queue = deque([init_pos])
    while moves_queue:
        top = moves_queue.popleft()
        row, col = 0, 0
        for i, line in enumerate(top):
            for j, entry in enumerate(line):
                if entry == 0:
                    row, col = i, j
        for delta_row, delta_col in directions:
            new_row, new_col = row + delta_row, col + delta_col
            if new_row >= 0 and new_row < 2 and new_col >= 0 and new_col < 3:
                new_state = list(list(line) for line in top)
                new_state[new_row][new_col], new_state[row][col] = new_state[row][col], new_state[new_row][new_col]
                new_tuples = tuple(tuple(line) for line in new_state)
                if new_tuples not in moves_map:
                    moves_map[new_tuples] = moves_map[top] + 1
                    moves_queue.append(new_tuples)
                    if new_tuples == target:
                        return moves_map[new_tuples]
    return -1