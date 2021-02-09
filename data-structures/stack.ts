
import { Messages } from '../utils/messages';
import { ErrorResult, OkResult, Result } from '../utils/result';
import LinkedList, { LinkedListNode } from './linked-list';

// linked list implementation
export default class Stack<T> {

    public data: LinkedList<T>;

    constructor() {
        this.data = new LinkedList<T>();
    }

    public push(data: T): Stack<T> {
        this.data.prepend(data);
        return this;
    }

    public pop(): Result<T> {
        const result = this.data.remove(0);
        if (!result.isValid) {
            return new ErrorResult(Messages.EmptyStack);
        }
        return new OkResult(result.value!.value);
    }

    public peek(): Result<T> {
        const result = this.data.traverseToIndex(0);
        if (!result.isValid) {
            return new ErrorResult(Messages.EmptyQueue);
        }
        return new OkResult(result.value!.value);
    }
}