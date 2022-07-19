class Solution:
    def wallsAndGates(self, rooms: List[List[int]]) -> None:
        """
        Do not return anything, modify rooms in-place instead.
        """
        def bfs(queue, matrix):
            directions = [(0,1),(1,0),(0,-1),(-1,0)]
            visited = set()
            
            while queue:
                r, c, steps = queue.popleft()
                if not (0 <= r < numRow) or not (0 <= c < numCol) or matrix[r][c] == -1 or (r, c) in visited:
                    continue
                visited.add((r, c))
                matrix[r][c] = min(matrix[r][c], steps)
                for x, y in directions:
                    newR, newC = r + x, c + y
                    queue.append((newR, newC, steps + 1))
        
        numRow = len(rooms)
        numCol = len(rooms[0])
        queue = deque([])
        for row in range(numRow):
            for col in range(numCol):
                if rooms[row][col] == 0:
                    queue.append((row, col, 0))
                    
        bfs(queue, rooms)

# solution
from collections import deque
from typing import List

directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]

INF = 2147483647

def map_gate_distances(dungeon_map: List[List[int]]) -> List[List[int]]:
    queue = deque()
    n = len(dungeon_map)
    m = len(dungeon_map[0])
    for i, row in enumerate(dungeon_map):
        for j, entry in enumerate(row):
            if entry == 0:
                queue.append((i, j))
    while queue:
        row, col = queue.popleft()
        for delta_row, delta_col in directions:
            total_row, total_col = row + delta_row, col + delta_col
            if total_row >= 0 and total_row < n and total_col >= 0 and total_col < m:
                if dungeon_map[total_row][total_col] == INF:
                    dungeon_map[total_row][total_col] = dungeon_map[row][col] + 1
                    queue.append((total_row, total_col))
    return dungeon_map