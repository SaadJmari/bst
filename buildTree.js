import node from "./node.js";

export default function buildTree(array) {

    const cleanedArray = [...new Set(array)].sort((a, b) => a - b);

    if (cleanedArray.length === 0) return null;

    const mid = Math.floor(cleanedArray.length / 2);
    const root = node(cleanedArray[mid])

    root.left = buildTree(cleanedArray.slice(0, mid));
    root.right = buildTree(cleanedArray.slice(mid + 1));

    return root;
}