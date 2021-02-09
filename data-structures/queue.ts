import { Messages } from "../utils/messages";
import { ErrorResult, OkResult, Result } from "../utils/result";
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

    public dequeue(): Result<T> {
        const result = this.data.remove(0);
        if (!result.isValid) {
            return new ErrorResult(Messages.EmptyQueue);
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