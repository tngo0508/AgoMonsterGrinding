from typing import List
from collections import deque

def shortest_path(graph: List[List[int]], a: int, b: int) -> int:
    # WRITE YOUR BRILLIANT CODE HERE
    queue = deque([(a, 0)])
    visited = set([a])
    while queue:
        node, distance = queue.popleft()
        if node == b:
            return distance
        for neighbor in graph[node]:
            if neighbor in visited:
                continue
            queue.append((neighbor, distance + 1))
            visited.add(neighbor)
    
    return 0

# solution
from collections import deque
from typing import List

def shortest_path(graph: List[List[int]], a: int, b: int) -> int:
    def get_neighbors(node: int):
        return graph[node]

    # BFS template
    def bfs(root: int, target: int):
        queue = deque([root])
        visited = set([root])
        level = 0
        while len(queue) > 0:
            n = len(queue)
            for n in range(n):
                node = queue.popleft()
                if node == target:
                    return level
                for neighbor in get_neighbors(node):
                    if neighbor in visited:
                        continue
                    queue.append(neighbor)
                    visited.add(neighbor)
            level += 1

    return bfs(a, b)