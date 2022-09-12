# my solution - leetcode
from typing import List
from collections import deque
from collections import defaultdict
from enum import Enum


class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        def create_graph(prerequisites, numCourses):
            graph = {course: [] for course in range(numCourses)}
            for a, b in prerequisites:
                graph[b].append(a)
            return graph
        
        
        def get_degrees(graph, numCourses):
            indegrees = {course: 0 for course in range(numCourses)}
            for listNode in graph.values():
                for node in listNode:
                    indegrees[node] += 1
            return indegrees
            
        
        res = []
        queue = deque([])
        graph = create_graph(prerequisites, numCourses)
        indegrees = get_degrees(graph, numCourses)
        for node, degree in indegrees.items():
            if degree == 0:
                queue.append(node)
        
        if not queue:
            return False
        
        while queue:
            node = queue.popleft()
            if indegrees[node] == 0:
                res.append(node)
            if indegrees[node] < 0:
                return False
            for child in graph[node]:
                indegrees[child] -= 1
                if indegrees[child] == 0:
                    queue.append(child)
        
        return len(res) == len(indegrees)


# my solution - algomonster
class State(Enum):
    TO_VISIT = 0
    VISITING = 1
    VISITED = 2

def is_valid_course_schedule(n: int, prerequisites: List[List[int]]) -> bool:
    def build_graph():
        graph = defaultdict(list)
        for src, dest in prerequisites:
            graph[src].append(dest)
        return graph

    def dfs(start, states):
        # mark self as visiting
        states[start] = State.VISITING

        for next_vertex in graph[start]:
            # ignore visited nodes
            if states[next_vertex] == State.VISITED:
                continue

            # revisiting a visiting node, CYCLE!
            if states[next_vertex] == State.VISITING:
                return False

            # recursively visit neighbours
            # if a neighbour found a cycle, we return False right away
            if not dfs(next_vertex, states):
                return False

        # mark self as visited
        states[start] = State.VISITED

        # if we have gotten this far, our neighbours haven't found any cycle, return True
        return True

    graph = build_graph()
    states = [State.TO_VISIT for _ in range(n)]

    # dfs on each node
    for i in range(n):
        if not dfs(i, states):
            return False

    return True

# print(is_valid_course_schedule(3, [[0, 1], [0, 2], [1,2]]))
print(is_valid_course_schedule(2, [[0, 1], [1, 0]]))