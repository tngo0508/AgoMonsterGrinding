from typing import List

# my solution
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        res = []
        n = len(intervals)
        intervals.sort()
        currStart, currEnd = intervals[0][0], intervals[0][1]
        for i in range(1, n):
            start, end = intervals[i][0], intervals[i][1]
            if currEnd < start:
                res.append([currStart, currEnd])
                currStart, currEnd = start, end
            else:
                currStart = min(currStart, start)
                currEnd = max(currEnd, end)
        
        res.append([currStart, currEnd])
        return res

# algomonster solution
def merge_intervals(intervals: List[List[int]]) -> List[List[int]]:
    intervals.sort()

    def overlap(a, b):
        return not (b[1] < a[0] or a[1] < b[0])

    res = []
    for interval in intervals:
        if not res or not overlap(res[-1], interval):
            res.append(interval)
        else:
            res[-1][1] = max(res[-1][1], interval[1])

    return res

# leetcode solution
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:

        intervals.sort(key=lambda x: x[0])

        merged = []
        for interval in intervals:
            # if the list of merged intervals is empty or if the current
            # interval does not overlap with the previous, simply append it.
            if not merged or merged[-1][1] < interval[0]:
                merged.append(interval)
            else:
            # otherwise, there is overlap, so we merge the current and previous
            # intervals.
                merged[-1][1] = max(merged[-1][1], interval[1])

        return merged