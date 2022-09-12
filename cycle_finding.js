class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function hasCycle(nodes) {
  // WRITE YOUR BRILLIANT CODE HERE
  let slow = nodes,
    fast = nodes;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

// solution
function nextNode(node) {
  if (node.next == null) return node;
  return node.next;
}

function hasCycle(nodes) {
  let tortoise = nextNode(nodes);
  let hare = nextNode(nextNode(nodes));
  while (tortoise !== hare && hare.next != null) {
    tortoise = nextNode(tortoise);
    hare = nextNode(nextNode(hare));
  }
  return hare.next != null;
}
