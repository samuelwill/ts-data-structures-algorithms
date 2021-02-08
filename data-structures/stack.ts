
import { ErrorResult, OkResult, Result } from '../utils/result';
import { LinkedListNode } from './linked-list';

// linked list implementation
export default class Stack<T> {

    public top?: LinkedListNode<T> = undefined;
    public bottom?: LinkedListNode<T> = undefined;
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

    public pop(): Result<LinkedListNode<T>> {
        if (!this.top) {
            return new ErrorResult('Stack is empty!');
        }
        const previousTop = this.top;
        if (this.top === this.bottom) {
            this.bottom = undefined;
        }
        this.top = this.top.next;
        this.count--;
        return new OkResult(previousTop);
    }

    public peek(): Result<T> {
        if (!this.top) {
            return new ErrorResult('Stack is empty!');
        }
        return new OkResult(this.top.value);
    }
}