export default class LinkedListNode<T> {

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
