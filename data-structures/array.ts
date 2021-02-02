
export default class Array2<T> {

    public length = 0;
    public data = {};

    // O(1)
    public get(index: number): T {
        return this.data[index];
    }

    // O(1)
    public push(value: T): Array2<T> {
        this.data[this.length] = value;
        this.length++;
        return this;
    }

    // O(1)
    public pop(): T {
        const last = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return last;
    }

    // O(n)
    public insert(value: T, index: number): Array2<T> {
        this.shiftElementsRightStartingAtIndex(index);
        this.data[index] = value;
        return this;
    }

    // O(n)
    public delete(index: number): T {
        const deletedElement = this.data[index];
        delete this.data[index];
        this.shiftElementsLeftStartingAtIndex(index);
        return deletedElement;
    }

    // O(n)
    private shiftElementsLeftStartingAtIndex(index: number): void {
        for (let i = index; i < this.length - 1; ++i) {
            this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
        this.length--;
    }

    // O(n)
    private shiftElementsRightStartingAtIndex(index: number): void {
        for (let i = this.length; i >= index; --i) {
            this.data[i] = this.data[i - 1];
        }
        this.length++;
    }
}