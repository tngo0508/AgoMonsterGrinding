# my solution inspired from algomonster
from typing import List
from collections import deque

def task_scheduling_2(tasks: List[str], times: List[int], requirements: List[List[str]]) -> int:
    # WRITE YOUR BRILLIANT CODE HERE
    def get_degrees(tasks, requirements):
        degrees = {task: 0 for task in tasks}
        for src, dst in requirements:
            degrees[dst] += 1
        return degrees
        
        
    queue = deque([])
    graph = {task: [] for task in tasks}
    timeDict = {x:y for x, y in zip(tasks, times)}
    distance = {x:y for x, y in zip(tasks, times)}
    for src, dst in requirements:
        graph[src].append(dst)
    degrees = get_degrees(tasks, requirements)
    result = 0
    for node, degree in degrees.items():
        if degree == 0:
            queue.append(node)
            result = max(timeDict[node], result)

    while queue:
        node = queue.popleft()
        for child in graph[node]:
            degrees[child] -= 1
            timeDict[child] = max(timeDict[child], timeDict[node] + distance[child])
            result = max(result, timeDict[child])
            if degrees[child] == 0:
                queue.append(child)
           
    return result

# algomonster solution
from collections import deque
from typing import Dict, List

def count_parents(graph):
    counts = {node: 0 for node in graph}
    for parent in graph:
        for node in graph[parent]:
            counts[node] += 1
    return counts


def topo_sort(graph, task_times):
    ans = 0
    q = deque()
    # init distances
    dis: Dict[str, int] = dict()
    for node in graph:
        dis[node] = 0
    counts = count_parents(graph)
    for node in counts:
        if counts[node] == 0:
            q.append(node)
            dis[node] = task_times[node]
            ans = max(ans, dis[node])
    while len(q) > 0:
        node = q.popleft()
        for child in graph[node]:
            counts[child] -= 1
            # update distances for children and answer
            dis[child] = max(dis[child], dis[node] + task_times[child])
            ans = max(ans, dis[child])
            if counts[child] == 0:
                q.append(child)
    return ans