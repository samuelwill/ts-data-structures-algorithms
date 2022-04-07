export default class Deque<T> {
    private data: T[] = [];
    private size = 0;
    private front = -1;
    private rear = 0;

    constructor(size: number) {
        this.size = size;
    }

    public isEmpty(): boolean {
        return this.front === -1;
    }

    public isFull(): boolean {
        return (this.front === 0 && this.rear === this.size - 1)
            || this.front === this.rear + 1;
    }

    // refactor to return a generic result type
    public insertFront(val: T): void {
        if (this.isFull()) {
            return;
        }
        if (this.front === -1) {
            this.front = 0;
            this.rear = 0;
        } else if (this.front === 0) {
            this.front = this.size - 1;
        } else {
            this.front = this.front - 1;
        }
        this.data[this.front] = val;
    }

    public
}
