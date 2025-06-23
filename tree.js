import buildTree from "./buildTree.js";
import node from "./node.js";

export default function tree(array) {
    let root = buildTree(array);

    function insert(value) {
        function recursiveInsert(current, value) {
            if (current === null) return node(value);

            if (value < current.value) {
                current.left = recursiveInsert(current.left, value);
            } else if (value > current.value) {
                current.right = recursiveInsert(current.right, value);
            }
            // If value === current.value, ignore duplicates
            return current;
        }

        root = recursiveInsert(root, value);
    }

    function find(value) {
        function recursiveFind(current, value) {
            if (current === null) return null;
            if (current.value === value) return current;

            if (value < current.value) {
                return recursiveFind(current.left, value);
            } else {
                return recursiveFind(current.right, value);
            }
        }

        return recursiveFind(root, value);
    }

    function deleteItem(value) {
        function findMin(node) {
            while (node.left !== null) {
                node = node.left;
            }
            return node;
        }

        function recursiveDelete(current, value) {
            if (current === null) return null;

            if (value < current.value) {
                current.left = recursiveDelete(current.left, value);
            } else if (value > current.value) {
                current.right = recursiveDelete(current.right, value);
            } else {
                // Node found
                // Case 1: No child
                if (current.left === null && current.right === null) {
                    return null;
                }
                // Case 2: One child
                if (current.left === null) return current.right;
                if (current.right === null) return current.left;

                // Case 3: Two children
                const successor = findMin(current.right);
                current.value = successor.value;
                current.right = recursiveDelete(current.right, successor.value);
            }

            return current;
        }

        root = recursiveDelete(root, value);
    }

    function levelOrder(callback) {
        const queue = [];
        const result = [];

        if (root === null) return [];

        queue.push(root);

        while (queue.length > 0) {
            const current = queue.shift();

            if (callback) {
                callback(current);
            } else {
                result.push(current.value);
            }

            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }

        if (!callback) return result;
    }

    function inOrder(callback) {
        const result = [];

        function traverse(node) {
            if (node === null) return;
            traverse(node.left);
            callback ? callback(node) : result.push(node.value);
            traverse(node.right);
        }

        traverse(root);
        if (!callback) return result;
    }

    function preOrder(callback) {
        const result = [];

        function traverse(node) {
            if (node === null) return;
            callback ? callback(node) : result.push(node.value);
            traverse(node.left);
            traverse(node.right);
        }

        traverse(root);
        if (!callback) return result;
    }

    function postOrder(callback) {
        const result = [];

        function traverse(node) {
            if (node === null) return;
            traverse(node.left);
            traverse(node.right);
            callback ? callback(node) : result.push(node.value);
        }

        traverse(root);
        if (!callback) return result;
    }

    function height(nodeOrValue) {
        let target = typeof nodeOrValue === 'object' ? nodeOrValue : find(nodeOrValue);
        if (!target) return null;

        function recursiveHeight(node) {
            if (node === null) return -1;
            const leftHeight = recursiveHeight(node.left);
            const rightHeight = recursiveHeight(node.right);
            return 1 + Math.max(leftHeight, rightHeight);
        }

        return recursiveHeight(target);
    }

    function depth(nodeOrValue) {
        let target = typeof nodeOrValue === 'object' ? nodeOrValue : find(nodeOrValue);
        if (!target) return null;

        function recursiveDepth(current, depthSoFar = 0) {
            if (current === null) return null;
            if (current === target) return depthSoFar;

            if (target.value < current.value) {
                return recursiveDepth(current.left, depthSoFar + 1);
            } else {
                return recursiveDepth(current.right, depthSoFar + 1);
            }
        }

        return recursiveDepth(root);
    }

    function isBalanced() {
        function check(node) {
            if (node === null) return true;

            const leftHeight = height(node.left);
            const rightHeight = height(node.right);

            if (Math.abs(leftHeight - rightHeight) > 1) return false;

            return check(node.left) && check(node.right);
        }

        return check(root);
    }

    function rebalance() {
        const values = inOrder(); // returns sorted array of current values
        root = buildTree(values); // rebuild balanced tree
    }




    return {
        root,
        insert,
        find,
        deleteItem,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        rebalance
    };


}