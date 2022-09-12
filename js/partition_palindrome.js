/**
 * @param {string} s
 * @return {string[][]}
 */
 var partition = function(s) {
    function isPalindrome(arr) {
        let l = 0, r = arr.length - 1;
        while (l <= r) {
            if (arr[l] !== arr[r]) {
                return false
            }
            ++l;
            --r;
        }
        return true;
    }
    
    function dfs(curr, res, s, n) {
        if (s.length === 0) {
            res.push([...curr]);
            return
        }
        
        for (let i = 0; i < s.length; ++i) {
            const candidate = s.slice(0, i + 1);
            curr.push(candidate);
            if (isPalindrome(candidate)) {
                dfs(curr, res, s.slice(i + 1), n);
            }
            curr.pop();
        }
    }

    let res = [];
    dfs([], res, s, s.length);
    return res;
};

// solution
function isPalindrome(word) {
    let l = 0, r = word.length - 1;
    while (l < r) {
        if (word.charAt(l) != word.charAt(r)) return false;
        l++;
        r--;
    }
    return true;
}

function partition(s) {
    const ans = [];
    const n = s.length;
    function dfs(start, part) {
        if (start == n) {
            ans.push([...part]);
            return;
        }
        for (let i = start + 1; i < n + 1; i++) {
            const prefix = s.substring(start, i);
            if (isPalindrome(prefix)) {
                part.push(prefix);
                dfs(i, part);
                part.pop();
            }
        }
    }
    dfs(0, []);
    return ans;
}