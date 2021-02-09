
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

    public breadthFirstSeachRecursive(): void {
        return;
    }

    public breadthFirstSearch(): T[] {
        let currentNode = this.root;
        if (!currentNode) {
            return [];
        }
        const list: T[] = [];
        const queue: Node<T>[] = [];
        queue.push(currentNode);

        while (queue.length > 0) {
            currentNode = queue.shift();
            if (!currentNode) {
                continue;
            }
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

    public depthFirstSearch(): T[] {
        return [];
    }

    private insertRecursive(value: T, node?: Node<T>): Node<T> {
        // base case
        if (!node) {
            node = new Node<T>(value);
            return node;
        }
        if (value < node.value) {
            node.left = this.insertRecursive(value, node.left);
        } else if (value > node.value) {
            node.right = this.insertRecursive(value, node.right);
        }
        return node;
    }

    private lookupRecursive(value: T, node?: Node<T>): boolean {
        //base case
        if (!node) {
            return false;
        }
        if (node.value === value) {
            return true;
        }
        if (value < node.value) {
            return this.lookupRecursive(value, node.left);
        }
        return this.lookupRecursive(value, node.right);
    }

    private inOrderRecursive(values: T[], node?: Node<T>): void {
        if (!node) {
            return;
        }
        this.inOrderRecursive(values, node.left);
        values.push(node.value);
        this.inOrderRecursive(values, node.right);
    }

    private preOrderRecursive(values: T[], node?: Node<T>): void {
        if (!node) {
            return;
        }
        values.push(node.value);
        this.preOrderRecursive(values, node.left);
        this.preOrderRecursive(values, node.right);
    }

    private postOrderRecursive(values: T[], node?: Node<T>): void {
        if (!node) {
            return;
        }
        this.postOrderRecursive(values, node.left);
        this.postOrderRecursive(values, node.right);
        values.push(node.value);
    }
}

class Node<T> {
    constructor(value: T) {
        this.value = value;
    }

    public value: T
    public left?: Node<T>;
    public right?: Node<T>;
}