import IComparatorCallback from '../../utils/i-comparator-callback';
import { Messages } from '../../utils/messages';
import { Result, OkResult, ErrorResult } from '../../utils/result';
import LinkedListNode from './linked-list-node';

export default class LinkedList<T> {

    public head?: LinkedListNode<T>;
    public tail?: LinkedListNode<T>;
    public count = 0;

    constructor(value?: T) {
        if (value) {
            const node = new LinkedListNode<T>(value);
            this.addNodeToEmptyList(node);
        }
    }

    public isEmpty(): boolean {
        return this.count === 0;
    }

    public prepend(value: T): LinkedList<T> {
        const node = new LinkedListNode<T>(value, this.head);
        if (this.isEmpty()) {
            this.addNodeToEmptyList(node);
            return this;
        }
        this.head!.previous = node;
        this.head = node;
        this.count++;
        return this;
    }

    public append(value: T): LinkedList<T> {
        const node = new LinkedListNode<T>(value);
        if (this.isEmpty()) {
            this.addNodeToEmptyList(node);
            return this;
        }
        node.previous = this.tail;
        this.tail!.next = node;
        this.tail = node;
        this.count++;
        return this;
    }

    public insert(value: T, index: number): Result<LinkedList<T>> {
        if (!this.indexIsInBounds(index)) {
            return new ErrorResult(Messages.IndexOutOfBounds);
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
        const targetNode = traversalResult.value!;
        if (targetNode.previous) {
            targetNode.previous.next = node;
        }
        node.previous = targetNode.previous;
        node.next = targetNode;
        targetNode.previous = node;

        if (index === 0) {
            this.head = node;
        }

        this.count++;
        return new OkResult(this);
    }

    public delete(value: T): Result<T> {
        let currentNode = this.head;
        let index = 0;
        while (currentNode) {
            if (currentNode.value === value) {
                this.remove(index);
                return new OkResult(value);
            }
            currentNode = currentNode.next;
            index++;
        }
        return new ErrorResult(Messages.ValueNotFound);
    }

    public remove(index: number): Result<LinkedListNode<T>> {
        const traversalResult = this.traverseToIndex(index);
        if (traversalResult instanceof ErrorResult) {
            return new ErrorResult(traversalResult.error);
        }
        const nodeToDelete = traversalResult.value!;
        if (index === 0) {
            this.head = nodeToDelete.next;
            if (this.head) {
                this.head.previous = undefined;
            }
        } else if (index === (this.count - 1)) {
            this.tail = nodeToDelete.previous;
            if (this.tail) {
                this.tail.next = undefined;
            }
        } else {
            nodeToDelete!.previous!.next = nodeToDelete.next;
            nodeToDelete!.next!.previous = nodeToDelete.previous;
        }

        this.count--;
        return new OkResult(nodeToDelete);
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

    public find(comparator: IComparatorCallback<T>): Result<T> {
        let currentNode = this.head;
        while (currentNode) {
            if (comparator.callback(currentNode.value)) {
                return new OkResult(currentNode.value);
            }
            currentNode = currentNode.next;
        }
        return new ErrorResult(Messages.ValueNotFound);
    }

    public traverseToIndex(targetIndex: number): Result<LinkedListNode<T>> {
        if (this.isEmpty()) {
            return new ErrorResult(Messages.EmptyList);
        }
        if (!this.indexIsInBounds(targetIndex)) {
            return new ErrorResult(Messages.IndexOutOfBounds);
        }

        let currentIndex = 0;
        let currentNode = this.head;

        while (currentIndex < targetIndex) {
            currentNode = currentNode!.next!;
            currentIndex++;
        }
        return new OkResult(currentNode);
    }

    private indexIsInBounds(index: number): boolean {
        return this.count > 0
            && index >= 0
            && index < this.count;
    }

    private addNodeToEmptyList(node: LinkedListNode<T>): void {
        this.head = node;
        this.tail = node;
        this.count++;
    }
}
