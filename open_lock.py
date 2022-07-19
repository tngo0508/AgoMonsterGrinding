from pprint import pprint
class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        def get_neighbor(string):
            for i, c in enumerate(string):
                curr = list(string)
                for j in [-1, 1]:
                    currDigit = int(c)
                    nextDigit = currDigit + j
                    replaceChar = str(nextDigit % 10)
                    if c != replaceChar:
                        curr[i] = replaceChar
                        yield "".join(curr)
        
        queue = deque([("0000", 0)])
        visited = set()
        while queue:
            node, moves = queue.popleft()
            if node == target:
                return moves
            if node in deadends:
                    continue 
            for neighbor in get_neighbor(node):
                if neighbor in visited:
                    continue
             
                queue.append((neighbor, moves + 1))
                visited.add(neighbor)
        return -1

# leetcode solution
class Solution(object):
    def openLock(self, deadends, target):
        def neighbors(node):
            for i in xrange(4):
                x = int(node[i])
                for d in (-1, 1):
                    y = (x + d) % 10
                    yield node[:i] + str(y) + node[i+1:]

        dead = set(deadends)
        queue = collections.deque([('0000', 0)])
        seen = {'0000'}
        while queue:
            node, depth = queue.popleft()
            if node == target: return depth
            if node in dead: continue
            for nei in neighbors(node):
                if nei not in seen:
                    seen.add(nei)
                    queue.append((nei, depth+1))
        return -1

# other solution
from collections import deque
from typing import List

next_digit = {**{str(i): str(i + 1) for i in range(9)}, "9": "0"}
prev_digit = {e: n for n, e in next_digit.items()}

def num_steps(target_combo: str, trapped_combos: List[str]) -> int:
    if target_combo == "0000":
        return 0
    trapped_combo_set = set(trapped_combos)
    steps = {
        "0000": 0
    }
    bfs_queue = deque({"0000"})
    while bfs_queue:
        top = bfs_queue.popleft()
        for i in range(4):
            new_combo = top[0:i] + next_digit[top[i]] + top[i + 1:]
            if new_combo not in trapped_combo_set and new_combo not in steps:
                bfs_queue.append(new_combo)
                steps[new_combo] = steps[top] + 1
                if new_combo == target_combo:
                    return steps[new_combo]
            new_combo = top[0:i] + prev_digit[top[i]] + top[i + 1:]
            if new_combo not in trapped_combo_set and new_combo not in steps:
                bfs_queue.append(new_combo)
                steps[new_combo] = steps[top] + 1
                if new_combo == target_combo:
                    return steps[new_combo]
    return -1