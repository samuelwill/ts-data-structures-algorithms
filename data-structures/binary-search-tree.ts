import Queue from './queue';

export default class BinarySearchTree<T> {
    public root?: Node<T>;

    public insert(value: T): BinarySearchTree<T> {
        this.root = this.insertRecursive(value, this.root);
        return this;
    }

    public lookup(value: T): boolean {
        return this.lookupRecursive(value, this.root);
    }

    public inOrder(): T[] {
        const values = [];
        this.inOrderRecursive(values, this.root);
        return values;
    }

    public preOrder(): T[] {
        const values = [];
        this.preOrderRecursive(values, this.root);
        return values;
    }

    public postOrder(): T[] {
        const values = [];
        this.postOrderRecursive(values, this.root);
        return values;
    }

    public breadthFirstSeachRecursive(): T[] {
        const keys: T[] = [];
        return keys;
    }

    // O(n)
    public breadthFirstSearch(): T[] {
        let currentNode = this.root;
        if (!currentNode) {
            return [];
        }
        const list: T[] = [];
        const queue = new Queue<Node<T>>();
        queue.enqueue(currentNode);

        while (queue.count > 0) {
            const dequeueResult = queue.dequeue();
            if (!dequeueResult.isValid) {
                continue;
            }
            currentNode = dequeueResult.value!;
            list.push(currentNode.key);
            if (currentNode.left) {
                queue.enqueue(currentNode.left);
            }
            if (currentNode.right) {
                queue.enqueue(currentNode.right);
            }
        }
        return list;
    }

    public depthFirstSearch(): T[] {
        return [];
    }

    private insertRecursive(key: T, node?: Node<T>): Node<T> {
        if (!node) {
            node = new Node<T>(key);
            return node;
        }
        if (key < node.key) {
            node.left = this.insertRecursive(key, node.left);
        } else if (key > node.key) {
            node.right = this.insertRecursive(key, node.right);
        }
        return node;
    }

    private lookupRecursive(key: T, node?: Node<T>): boolean {
        if (!node) {
            return false;
        }
        if (node.key === key) {
            return true;
        }
        if (key < node.key) {
            return this.lookupRecursive(key, node.left);
        }
        return this.lookupRecursive(key, node.right);
    }

    private inOrderRecursive(keys: T[], node?: Node<T>): void {
        if (!node) {
            return;
        }
        this.inOrderRecursive(keys, node.left);
        keys.push(node.key);
        this.inOrderRecursive(keys, node.right);
    }

    private preOrderRecursive(keys: T[], node?: Node<T>): void {
        if (!node) {
            return;
        }
        keys.push(node.key);
        this.preOrderRecursive(keys, node.left);
        this.preOrderRecursive(keys, node.right);
    }

    private postOrderRecursive(keys: T[], node?: Node<T>): void {
        if (!node) {
            return;
        }
        this.postOrderRecursive(keys, node.left);
        this.postOrderRecursive(keys, node.right);
        keys.push(node.key);
    }
}

class Node<T> {
    constructor(value: T) {
        this.key = value;
    }

    public key: T
    public left?: Node<T>;
    public right?: Node<T>;
}