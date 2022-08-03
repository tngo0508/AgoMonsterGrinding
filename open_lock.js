/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
 var openLock = function(deadends, target) {
    function* getNeighbor(idx, currString, steps) {
        for (const x of [-1, 1]) {
            const arr = Array.from(currString, (v, i) => {
                const val = parseInt(v);
                if (i === idx) {
                    const newVal = val + x;
                    if (newVal > 9) return 0;
                    else if (newVal < 0) return 9;
                    return newVal;
                }
                return val;
            });
            yield [arr.join(""), steps + 1];
        }
    }
    
    
    function bfs(queue, deadendSet) {
        const visited = new Set();
        visited.add(queue[0]);
        while (queue.length > 0) {
            const [node, steps] = queue.shift();
            if (deadendSet.has(node)) continue;
            if (node === target) return steps;
            for (let i = 0; i < 4; ++i) {
                for (const neighbor of getNeighbor(i, node, steps)) {
                    if (visited.has(neighbor[0])) continue;
                    queue.push(neighbor);
                    visited.add(neighbor[0]);
                }
            }
        }
        return -1;
    }
    
    let queue = [['0000', 0]];
    let deadendSet = new Set(deadends);
    return bfs(queue, deadendSet);
};

// algomonster solution
const nextDigit = new Map();
for (let i = 0; i < 10; i++) {
    let val = (i + 1) % 10;
    nextDigit.set(i.toString(), val.toString());
}
const prevDigit = new Map();
for (let [key, val] of nextDigit.entries()) {
    prevDigit.set(val, key);
}

function numSteps(targetCombo, trappedCombos) {
    if (targetCombo === "0000") return 0;
    const trappedComboSet = new Set([...trappedCombos]);
    const steps = new Map();
    steps.set("0000", 0);
    const bfsQueue = [];
    bfsQueue.push("0000");
    while (bfsQueue.length > 0) {
        let top = bfsQueue.shift();
        for (let i = 0; i < 4; i++) {
            let newCombo = top.slice(0, i) + nextDigit.get(top.charAt(i)) + top.slice(i + 1);
            if (!trappedComboSet.has(newCombo) && !steps.has(newCombo)) {
                bfsQueue.push(newCombo);
                steps.set(newCombo, steps.get(top) + 1);
                if (newCombo === targetCombo) return steps.get(newCombo);
            }
            newCombo = top.slice(0, i) + prevDigit.get(top.charAt(i)) + top.slice(i + 1);
            if (!trappedComboSet.has(newCombo) && !steps.has(newCombo)) {
                bfsQueue.push(newCombo);
                steps.set(newCombo, steps.get(top) + 1);
                if (newCombo === targetCombo) return steps.get(newCombo);
            }
        }
    }
    return -1;
}