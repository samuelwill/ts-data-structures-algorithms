
import { LinkedListNode } from './linked-list';

// linked list implementation
export default class Stack<T> {

    public top: LinkedListNode<T> = null;
    public bottom: LinkedListNode<T> = null;
    public count = 0;

    public push(data: T): Stack<T> {
        const node = new LinkedListNode<T>(data);
        if (!this.top) {
            this.top = node;
            this.bottom = node;
            this.count++;
            return this;
        }
        const previousTop = this.top;
        this.top = node;
        this.top.next = previousTop;
        this.count++;
        return this;
    }

    public pop(): LinkedListNode<T> {
        if (!this.top) {
            return null;
        }
        const previousTop = this.top;
        if (this.top === this.bottom) {
            this.bottom = null;
        }
        this.top = this.top.next;
        this.count--;
        return previousTop;
    }

    public peek(): T {
        if (!this.top) {
            return null;
        }
        return this.top.value;
    }
}