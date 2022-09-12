# my solution
# time limit exceeded
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        def check(w1, w2):
            count = 0
            for c1, c2 in zip(w1, w2):
                if c1 != c2:
                    count += 1
            return count == 1
            
        def get_neighbor(currWord):
            for word in wordList:
                if check(word, currWord):
                    yield word
            
        queue = deque([(beginWord, 1)])
        visited = set()
        while queue:
            node, step = queue.popleft()
            if node == endWord:
                return step
            
            for neighbor in get_neighbor(node):
                if neighbor in visited:
                    continue
                queue.append((neighbor, step + 1))
                visited.add(neighbor)
        return 0


# my solution inspired from leetcode solution
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        def get_next_word(currWord, all_combo_words):
            for word in all_combo_words[currWord]:
                yield word
            
        queue = deque([(beginWord, 0)])
        visited = set()
        
        # create ajacency list
        all_combo_words = {}
        for word in wordList:
            for i in range(len(word)):
                combo = word[:i] + "*" + word[i + 1:]
                all_combo_words[combo] = all_combo_words.get(combo, []) + [word]
        
        # use bfs to find the shortest path
        while queue:
            length = len(queue)
            for _ in range(length):
                word, step = queue.popleft()
                if word == endWord:
                    return step + 1
                for i, c in enumerate(word):
                    combo = word[:i] + "*" + word[i + 1:]
                    if combo in all_combo_words:
                        for next_word in get_next_word(combo, all_combo_words):
                            if next_word in visited:
                                continue
                            queue.append((next_word, step + 1))
                            visited.add(next_word)
        return 0


# leetcode solution
from collections import defaultdict
class Solution(object):
    def ladderLength(self, beginWord, endWord, wordList):
        """
        :type beginWord: str
        :type endWord: str
        :type wordList: List[str]
        :rtype: int
        """

        if endWord not in wordList or not endWord or not beginWord or not wordList:
            return 0

        # Since all words are of same length.
        L = len(beginWord)

        # Dictionary to hold combination of words that can be formed,
        # from any given word. By changing one letter at a time.
        all_combo_dict = defaultdict(list)
        for word in wordList:
            for i in range(L):
                # Key is the generic word
                # Value is a list of words which have the same intermediate generic word.
                all_combo_dict[word[:i] + "*" + word[i+1:]].append(word)


        # Queue for BFS
        queue = collections.deque([(beginWord, 1)])
        # Visited to make sure we don't repeat processing same word.
        visited = {beginWord: True}
        while queue:
            current_word, level = queue.popleft()
            for i in range(L):
                # Intermediate words for current word
                intermediate_word = current_word[:i] + "*" + current_word[i+1:]

                # Next states are all the words which share the same intermediate state.
                for word in all_combo_dict[intermediate_word]:
                    # If at any point if we find what we are looking for
                    # i.e. the end word - we can return with the answer.
                    if word == endWord:
                        return level + 1
                    # Otherwise, add it to the BFS Queue. Also mark it visited
                    if word not in visited:
                        visited[word] = True
                        queue.append((word, level + 1))
                all_combo_dict[intermediate_word] = []
        return 0

# alogmonster solution
from collections import deque
from string import ascii_letters
from typing import List

def word_ladder(begin: str, end: str, word_list: List[str]) -> int:
    words = set(word_list) # make a set because existence query is O(1) vs O(N) for list
    queue = deque([begin])
    distance = 0
    while len(queue) > 0:
        n = len(queue)
        distance += 1
        for _ in range(n):
            word = queue.popleft()
            for i in range(len(word)):
                for c in ascii_letters:
                    next_word = word[:i] + c + word[i + 1:]
                    if next_word not in words:
                        continue
                    if next_word == end:
                        return distance
                    queue.append(next_word)
                    words.remove(next_word) # removing from the set is equivalent as marking the word visited
    return 0