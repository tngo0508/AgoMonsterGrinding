# solution from Grokking
from collections import deque


def find_order(words):
  if len(words) == 0:
    return ""

  # a. Initialize the graph
  inDegree = {}  # count of incoming edges
  graph = {}  # adjacency list graph
  for word in words:
    for character in word:
      inDegree[character] = 0
      graph[character] = []

  # b. Build the graph
  for i in range(0, len(words)-1):
    # find ordering of characters from adjacent words
    w1, w2 = words[i], words[i + 1]
    for j in range(0, min(len(w1), len(w2))):
      parent, child = w1[j], w2[j]
      if parent != child:  # if the two characters are different
        # put the child into it's parent's list
        graph[parent].append(child)
        inDegree[child] += 1  # increment child's inDegree
        break  # only the first different character between the two words will help us find the order

  # c. Find all sources i.e., all vertices with 0 in-degrees
  sources = deque()
  for key in inDegree:
    if inDegree[key] == 0:
      sources.append(key)

  # d. For each source, add it to the sortedOrder and subtract one from all of its children's in-degrees
  # if a child's in-degree becomes zero, add it to the sources queue
  sortedOrder = []
  while sources:
    vertex = sources.popleft()
    sortedOrder.append(vertex)
    for child in graph[vertex]:  # get the node's children to decrement their in-degrees
      inDegree[child] -= 1
      if inDegree[child] == 0:
        sources.append(child)

  # if sortedOrder doesn't contain all characters, there is a cyclic dependency between characters, therefore, we
  # will not be able to find the correct ordering of the characters
  if len(sortedOrder) != len(inDegree):
    return ""

  return ''.join(sortedOrder)


def main():
  print("Character order: " + find_order(["ba", "bc", "ac", "cab"]))
  print("Character order: " + find_order(["cab", "aaa", "aab"]))
  print("Character order: " + find_order(["ywx", "wz", "xww", "xz", "zyy", "zwz"]))


main()


# my solution - the way that i understand
class Solution:
    def alienOrder(self, words: List[str]) -> str:
        def get_degrees(graph):
            degrees = {node:0 for node in graph.keys()}
            for nodeList in graph.values():
                for node in nodeList:
                    degrees[node] += 1
            return degrees
            
            
        graph = {}
        for word in words:
            for c in word:
                if c not in graph:
                    graph[c] = []

        # IMPORTANT PART#
        # from grokking
        for w1, w2 in zip(words[:-1], words[1:]):
            for i in range(min(len(w1), len(w2))):
                src, dst = w1[i], w2[i]
                if src != dst:
                    graph[src].append(dst)
                    # degrees[dst] += 1
                    break
            else: 
                # this part is from leetcode, 
                # The input can contain words followed by their prefix, for example, abcd and then ab. These cases will never result in a valid 
                # alphabet (because in a valid alphabet, prefixes are always first). You'll need to make sure your solution detects these cases correctly.
                if len(w2) < len(w1):
                    return ""

        # the for-else is equivalent to the following...
        '''
        for w1, w2 in zip(words[:-1], words[1:]):
            is_valid = False
            for i in range(min(len(w1), len(w2))):
                src, dst = w1[i], w2[i]
                if src != dst:
                    graph[src].append(dst)
                    is_valid = True
                    break
            if not is_valid:
                if len(w2) < len(w1):
                    return ""
        '''
        # IMPORTANT PART#

        degrees = get_degrees(graph)
        queue = deque([])
        for node, degree in degrees.items():
            if degree == 0:
                queue.append(node)
        
        # print(graph)
        # print(degrees)
        res = []
        while queue:
            node = queue.popleft()
            if degrees[node] == 0:
                res.append(node)
            for child in graph[node]:
                degrees[child] -= 1
                if degrees[child] == 0:
                    queue.append(child)
                    
        if len(res) != len(degrees):
            return ""
        
        return "".join(res)
            
                    
# algomonster solution
from heapq import heappop, heappush
from typing import List

def count_parents(graph):
    counts = {node: 0 for node in graph}
    for parent in graph:
        for node in graph[parent]:
            counts[node] += 1
    return counts


def topo_sort(graph):
    res = []
    pq = []
    counts = count_parents(graph)
    for node in counts:
        if counts[node] == 0:
            heappush(pq, node)
    while len(pq) > 0:
        node = heappop(pq)
        res.append(node)
        for child in graph[node]:
            counts[child] -= 1
            if counts[child] == 0:
                heappush(pq, child)

    for count in counts.values():
        if count != 0:
            return None
    return res


def alien_order(words: List[str]) -> str:
    # init graph
    graph: Dict[str, List[str]] = dict()
    for word in words:
        for c in word:
            if not c in graph:
                graph[c] = list()

    prev = words[0]
    for i in range(1, len(words)):
        cur = words[i]
        j = 0
        while j < len(prev) and j < len(cur):
            # ignore duplicates
            if (prev[j] != cur[j]):
                if not cur[j] in graph[prev[j]]:
                    graph[prev[j]].append(cur[j])
                break
            j += 1
        prev = cur

    s = topo_sort(graph)
    if s is None:
        return ""
    return "".join(s)