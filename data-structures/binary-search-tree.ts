export default class BinarySearchTree<T> {
    public root: Node<T> = null;

    public insert(value: T): BinarySearchTree<T> {
        const newNode = new Node<T>(value);
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        let currentNode = this.root;
        while (currentNode) {
            if (value < currentNode.value) {
                if (!currentNode.left) {
                    currentNode.left = newNode;
                    return this;
                }
                currentNode = currentNode.left;
            } else {
                if (!currentNode.right) {
                    currentNode.right = newNode;
                    return this;
                }
                currentNode = currentNode.right;
            }
        }
    }

    public lookup(value: T): boolean {
        if (!this.root) {
            return false;
        }
        let currentNode = this.root;
        while (currentNode) {
            if (currentNode.value === value) {
                return true;
            }
            if (currentNode.value > value) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
        return false;
    }

    public breadthFirstSearch(): T[] {
        let currentNode = this.root;
        const list = [];
        const queue = [];
        queue.push(currentNode);

        while (queue.length > 0) {
            currentNode = queue.shift();
            list.push(currentNode.value);
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
        return list;
    }
}

class Node<T> {
    constructor(value: T) {
        this.value = value;
    }

    public value: T
    public left: Node<T>;
    public right: Node<T>;
}