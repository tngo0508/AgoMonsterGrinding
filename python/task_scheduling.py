from typing import List
from collections import deque

def task_scheduling(tasks: List[str], requirements: List[List[str]]) -> List[str]:
    # WRITE YOUR BRILLIANT CODE HERE
    def get_node_degree(tasks, requirements):
        degrees = {task:0 for task in tasks}
        for src, des in requirements:
            degrees[des] += 1
        return degrees
    
    def create_graph(tasks, requirements):
        graph = {task:[] for task in tasks}
        for x, y in requirements:
            graph[x] = graph.get(x, []) + [y]
        return graph
        
    res = []
    queue = deque([])
    graph = create_graph(tasks, requirements)
    degrees = get_node_degree(tasks, requirements)
    for node, degree in degrees.items():
        if degree == 0:
            queue.append(node)
            
    while queue:
        node = queue.popleft()
        if degrees[node] == 0:
            res.append(node)
        for child in graph[node]:
            degrees[child] -= 1
            if degrees[child] == 0:
                queue.append(child)
    
    return res


# solution
from collections import deque
from typing import List

def count_parents(graph):
    counts = { node: 0 for node in graph }
    for parent in graph:
        for node in graph[parent]:
            counts[node] += 1
    return counts


def topo_sort(graph):
    res = []
    q = deque()
    counts = count_parents(graph)
    for node in counts:
        if counts[node] == 0:
            q.append(node)
    while len(q) > 0:
        node = q.popleft()
        res.append(node)
        for child in graph[node]:
            counts[child] -= 1
            if counts[child] == 0:
                q.append(child)
    return res if len(graph) == len(res) else None

def task_scheduling(tasks: List[str], requirements: List[List[str]]) -> List[str]:
    graph = {t: [] for t in tasks}
    for a, b in requirements:
        graph[a].append(b)
    return topo_sort(graph)