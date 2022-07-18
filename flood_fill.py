from typing import List
from collections import deque

def flood_fill(r: int, c: int, replacement: int, image: List[List[int]]) -> List[List[int]]:
    # WRITE YOUR BRILLIANT CODE HERE
    numRow = len(image)
    numCol = len(image[0]) if numRow > 0 else 0
    
    if not (0 <= r < numRow) or not (0 <= c < numCol):
        return []
    
    def bfs(matrix, inputRow, inputCol, replacement):
        color = matrix[inputRow][inputCol]
        if color == replacement:
            return matrix
        
        directions = [(0,1),(-1,0),(1,0),(0,-1)]
        queue = deque([(inputRow, inputCol)])
              
        while queue:
            row, col = queue.popleft()
            matrix[row][col] = replacement
            for x, y in directions:
                newRow = row + x
                newCol = col + y
                if 0 <= newRow < numRow and 0 <= newCol < numCol and matrix[newRow][newCol] == color:
                    queue.append((newRow, newCol))
    
    bfs(image, r, c, replacement)
    
    return image


# solution
from collections import deque
from typing import List

def flood_fill(r: int, c: int, replacement: int, image: List[List[int]]) -> List[List[int]]:
    num_rows, num_cols = len(image), len(image[0])
    def get_neighbors(coord, color):
        row, col = coord
        delta_row = [-1, 0, 1, 0]
        delta_col = [0, 1, 0, -1]
        for i in range(len(delta_row)):
            neighbor_row = row + delta_row[i]
            neighbor_col = col + delta_col[i]
            if 0 <= neighbor_row < num_rows and 0 <= neighbor_col < num_cols:
                if image[neighbor_row][neighbor_col] == color:
                    yield neighbor_row, neighbor_col

    def bfs(root):
        queue = deque([root])
        visited = [[False for c in range(num_cols)] for r in range(num_rows)]
        r, c = root
        color = image[r][c]
        image[r][c] = replacement # replace root color
        visited[r][c] = True
        while len(queue) > 0:
            node = queue.popleft()
            for neighbor in get_neighbors(node, color):
                r, c = neighbor
                if visited[r][c]:
                    continue
                image[r][c] = replacement # replace color
                queue.append(neighbor)
                visited[r][c] = True

    bfs((r, c))
    return image