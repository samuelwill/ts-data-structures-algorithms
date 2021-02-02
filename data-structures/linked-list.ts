
export default class LinkedList<T> {

    public head: LinkedListNode<T> = null;
    public tail: LinkedListNode<T> = null;
    public count = 0;

    constructor(value: T) {
        const node = new LinkedListNode<T>(value);
        this.head = node;
        this.tail = node;
        this.count++;
    }

    public prepend(value: T): LinkedList<T> {
        const node = new LinkedListNode<T>(value, this.head);
        this.head.previous = node;
        this.head = node;
        this.count++;
        return this;
    }

    public append(value: T): LinkedList<T> {
        const node = new LinkedListNode<T>(value);
        node.previous = this.tail;
        this.tail.next = node;
        this.tail = node;
        this.count++;
        return this;
    }

    public insert(value: T, index: number): LinkedList<T> {
        this.validateIndex(index);

        const node = new LinkedListNode<T>(value);

        if (this.count === 0) {
            this.head = node;
            this.tail = node;
            this.count++;
            return this;
        }

        const targetNode = this.traverseToIndex(index);

        targetNode.previous.next = node;
        node.previous = targetNode.previous;
        node.next = targetNode;
        targetNode.previous = node;
        this.count++;
        return this;
    }

    public remove(index: number): LinkedList<T> {
        this.validateIndex(index);
        const nodeToDelete = this.traverseToIndex(index);
        if (index === 0) {
            this.head = nodeToDelete.next;
            this.head.previous = null;
        } else if (index === (this.count - 1)) {
            this.tail = nodeToDelete.previous;
            this.tail.next = null;
        } else {
            nodeToDelete.previous.next = nodeToDelete.next;
            nodeToDelete.next.previous = nodeToDelete.previous;
        }

        this.count--;
        return this;
    }

    public reverse(): LinkedList<T> {
        let currentNode = this.head;
        while (currentNode) {
            const prev = currentNode.previous;
            const next = currentNode.next;
            currentNode.previous = currentNode.next;
            currentNode.next = prev;
            currentNode = next;
        }
        const head = this.head;
        this.head = this.tail;
        this.tail = head;
        return this;
    }

    public getValues(): T[] {
        const arr = [];
        let currentNode = this.head;
        while (currentNode !== null) {
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return arr;
    }

    private validateIndex(index): void {
        if (!this.indexIsInBounds(index)) {
            throw new Error('Index out of bounds exception!');
        }
    }

    private indexIsInBounds(index: number): boolean {
        return (this.count > 0 && index <= this.count - 1)
            || index === 0;
    }

    private traverseToIndex(index: number): LinkedListNode<T> {
        let counter = 0;
        let currentNode = this.head;

        while (counter < index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }

}

export class LinkedListNode<T> {

    public value: T;
    public next: LinkedListNode<T>;
    public previous: LinkedListNode<T>;

    constructor(
        value: T,
        next: LinkedListNode<T> = null,
        previous: LinkedListNode<T> = null
    ) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }
}