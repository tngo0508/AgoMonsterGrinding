class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        numRow = len(grid)
        numCol = len(grid[0])
        def get_neighbor(grid, row, col):
            directions = [(0,1),(-1,0),(1,0),(0,-1)]
            for x, y in directions:
                r = row + x
                c = col + y
                yield (r,c)

        def bfs(grid, row, col):
            queue = deque([(row, col)])
            while queue:
                r, c = queue.popleft()
                
                if not 0 <= r < numRow or not 0 <= c < numCol or grid[r][c] == "0":
                    continue
                    
                grid[r][c] = "0"
                
                for x, y in get_neighbor(grid, r, c):
                    queue.append((x, y))

        num_of_islands = 0
        for row in range(numRow):
            for col in range(numCol):
                if grid[row][col] == "1":
                    bfs(grid, row, col)
                    num_of_islands += 1

        return num_of_islands

# solution
from collections import deque
from typing import List

def count_number_of_islands(grid: List[List[int]]) -> int:
    num_rows = len(grid)
    num_cols = len(grid[0])

    def get_neighbors(coord):
        res = []
        row, col = coord
        delta_row = [-1, 0, 1, 0]
        delta_col = [0, 1, 0, -1]
        for i in range(len(delta_row)):
            r = row + delta_row[i]
            c = col + delta_col[i]
            if 0 <= r < num_rows and 0 <= c < num_cols:
                res.append((r, c))
        return res

    def bfs(start):
        queue = deque([start])
        r, c = start
        grid[r][c] = 0
        while len(queue) > 0:
            node = queue.popleft()
            for neighbor in get_neighbors(node):
                r, c = neighbor
                if grid[r][c] == 0:
                    continue
                queue.append(neighbor)
                grid[r][c] = 0

    count = 0
    # bfs starting from each unvisited land cell
    for r in range(num_rows):
        for c in range(num_cols):
            if grid[r][c] == 0:
                continue
            bfs((r, c))
            count += 1 # bfs would find 1 connected island, increment count
    return count