import { Messages } from "../utils/messages";
import { ErrorResult, Result } from "../utils/result";
import LinkedList, { LinkedListNode } from "./linked-list";

export default class Queue<T> {
    private data: LinkedList<T>;

    constructor() {
        this.data = new LinkedList<T>();
    }

    public enqueue(value: T): Queue<T> {
        this.data.append(value);
        return this;
    }

    public dequeue(): Result<LinkedListNode<T>> {
        const result = this.data.remove(0);
        if (!result.isValid) {
            return new ErrorResult(Messages.EmptyQueue);
        }
        return result;
    }

    public peek(): Result<LinkedListNode<T>> {
        const result = this.data.traverseToIndex(0);
        if (!result.isValid) {
            return new ErrorResult(Messages.EmptyQueue);
        }
        return result;
    }
}