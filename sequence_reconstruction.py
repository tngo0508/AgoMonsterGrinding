# my solution
def sequence_reconstruction(original: List[int], seqs: List[List[int]]) -> bool:
    # WRITE YOUR BRILLIANT CODE HERE
    def get_degrees(graph):
        degrees = {node: 0 for node in graph}
        for nodeList in graph.values():
            for node in nodeList:
                degrees[node] += 1
        return degrees
    
    
    def topo_sort(graph, original):
        queue = deque([])
        res = []
        degrees = get_degrees(graph)
        for k, v in degrees.items():
            if v == 0:
                queue.append(k)
        while queue:
            node = queue.popleft()
            if degrees[node] == 0:
                res.append(node)
            count = 0
            for child in graph[node]:
                degrees[child] -= 1
                if degrees[child] == 0:
                    count += 1
                    queue.append(child)
            if count > 1:
                return False
        return res == original
    
    
    graph = {node:[] for node in original}
    for seq in seqs:
        for i in range(len(seq) - 1):
            graph[seq[i]].append(seq[i + 1])
        
    return topo_sort(graph, original)

# solution
from collections import deque
from typing import List

def sequence_reconstruction(original: List[int], seqs: List[List[int]]) -> bool:
    def count_parents(graph):
        counts = { node: 0 for node in graph }
        for parent in graph:
            for node in graph[parent]:
                counts[node] += 1
        return counts


    def topo_sort(graph):
        seq = []
        q = deque()
        counts = count_parents(graph)
        for node in counts:
            if counts[node] == 0:
                q.append(node)
        while len(q) > 0:
            if len(q) > 1: # if there's > 1 item, then the recontruction is not unique
                return False
            node = q.popleft()
            seq.append(node)
            for child in graph[node]:
                counts[child] -= 1
                if counts[child] == 0:
                    q.append(child)
        return seq == original

    # Create the graph from the sequences
    # The orginal sequence is a permutation of the integers from 1 to n
    n = len(original)
    graph = { node: set() for node in range(1, 1 + n) } # nodes from 1 to n
    for seq in seqs:
        for i in range(len(seq) - 1): # create an edge for each adjancent pairs
            source, destination = seq[i], seq[i + 1]
            graph[source].add(destination)
    return topo_sort(graph)