from typing import List
from collections import deque
from pprint import pprint

def map_gate_distances(dungeon_map: List[List[int]]) -> List[List[int]]:
    # WRITE YOUR BRILLIANT CODE HERE
    def bfs(matrix, currRow, currCol):
        directions = [(0,1),(1,0),(0,-1),(-1,0)]
        queue = deque([(currRow, currCol, 0)])
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
        
        
    numRow = len(dungeon_map)
    numCol = len(dungeon_map[0])
    for row in range(numRow):
        for col in range(numCol):
            if dungeon_map[row][col] == 0:
                bfs(dungeon_map, row, col)
            
            
    return dungeon_map

INF = 2147483647
dungeon_map = [
  [INF, -1, 0, INF],
  [INF, INF, INF, -1],
  [INF, -1, INF, -1],
  [0, -1, INF, INF],
]

pprint(map_gate_distances(dungeon_map))