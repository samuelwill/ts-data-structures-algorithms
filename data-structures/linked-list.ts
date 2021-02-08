import { Result, OkResult, ErrorResult } from './../utils/result';

export default class LinkedList<T> {

    public head?: LinkedListNode<T>;
    public tail?: LinkedListNode<T>;
    public count = 0;

    constructor(value: T) {
        const node = new LinkedListNode<T>(value);
        this.addNodeToEmptyList(node);
    }

    public isEmpty(): boolean {
        return this.count === 0;
    }

    public prepend(value: T): LinkedList<T> {
        const node = new LinkedListNode<T>(value, this.head);
        if (!this.head) {
            this.addNodeToEmptyList(node);
            return this;
        }
        this.head.previous = node;
        this.head = node;
        this.count++;
        return this;
    }

    public append(value: T): LinkedList<T> {
        const node = new LinkedListNode<T>(value);
        if (!this.tail) {
            this.addNodeToEmptyList(node);
            return this;
        }
        node.previous = this.tail;
        this.tail.next = node;
        this.tail = node;
        this.count++;
        return this;
    }

    public insert(value: T, index: number): Result<LinkedList<T>> {
        if (!this.indexIsInBounds(index)) {
            return new ErrorResult('Index out of bounds!');
        }

        const node = new LinkedListNode<T>(value);
        if (this.isEmpty()) {
            this.addNodeToEmptyList(node);
            return new OkResult(this);
        }

        const traversalResult = this.traverseToIndex(index);
        if (traversalResult instanceof ErrorResult) {
            return new ErrorResult(traversalResult.error);
        }
        const targetNode = traversalResult.value;
        if (!targetNode) {
            return new ErrorResult('Could not find element!');
        }
        if (targetNode.previous) {
            targetNode.previous.next = node;
        }
        node.previous = targetNode.previous;
        node.next = targetNode;
        targetNode.previous = node;
        this.count++;
        return new OkResult(this);
    }

    public remove(index: number): Result<LinkedList<T>> {

        const traversalResult = this.traverseToIndex(index);
        if (traversalResult instanceof ErrorResult) {
            return new ErrorResult(traversalResult.error);
        }
        const nodeToDelete = traversalResult.value;
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
        const arr: T[] = [];
        let currentNode = this.head;
        while (currentNode) {
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return arr;
    }

    private traverseToIndex(index: number): Result<LinkedListNode<T>> {

        if (!this.head) {
            return new ErrorResult('List is empty!');
        }
        if (!this.indexIsInBounds(index)) {
            return new ErrorResult('Invalid index!');
        }

        let counter = 0;
        let currentNode = this.head;

        while (counter < index) {
            if (!currentNode.next) {
                return new OkResult(currentNode);
            }
            currentNode = currentNode.next;
            counter++;
        }
        return new OkResult(currentNode);
    }

    private indexIsInBounds(index: number): boolean {
        return (this.count > 0 && index <= this.count - 1)
            || index === 0;
    }

    private addNodeToEmptyList(node: LinkedListNode<T>): void {
        this.head = node;
        this.tail = node;
        this.count++;
    }
}

export class LinkedListNode<T> {

    public value: T;
    public next?: LinkedListNode<T>;
    public previous?: LinkedListNode<T>;

    constructor(
        value: T,
        next?: LinkedListNode<T>,
        previous?: LinkedListNode<T>
    ) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }
}