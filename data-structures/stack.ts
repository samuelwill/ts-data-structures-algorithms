
import { Messages } from '../utils/messages';
import { ErrorResult, OkResult, Result } from '../utils/result';
import LinkedList from './linked-list/linked-list';

export default class Stack<T> {

    public get size(): number {
        return this.data.count;
    }

    private data: LinkedList<T>;

    constructor() {
        this.data = new LinkedList<T>();
    }

    public isEmpty(): boolean {
        return this.data.isEmpty();
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
