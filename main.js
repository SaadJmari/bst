import tree from "./tree.js";

function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) return;

    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }

    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);

    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

const Tree = tree([7, 4, 9, 1, 6, 14]);
Tree.insert(8);
console.log(Tree.find(6));
console.log(Tree.find(100));
console.log(Tree.height(4));
console.log(Tree.depth(6));

const myTree = tree(Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)));

prettyPrint(myTree.root);
console.log("Balanced?", myTree.isBalanced());

myTree.insert(120);
myTree.insert(130);
myTree.insert(140);
console.log("Balanced after inserting high numbers?", myTree.isBalanced());

myTree.rebalance();
console.log("Balanced after rebalancing?", myTree.isBalanced());
prettyPrint(myTree.root);
