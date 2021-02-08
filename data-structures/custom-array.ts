
interface ICustomArrayData<T> {
    [key: number]: T
}

export default class CustomArray<T> {

    public length = 0;
    public data: ICustomArrayData<T> = {};

    // O(1)
    public get(index: number): T {
        return this.data[index];
    }

    // O(1)
    public push(value: T): CustomArray<T> {
        this.data[this.length] = value;
        this.length++;
        return this;
    }

    // O(1)
    public pop(): T {
        const lastIndex = this.length - 1;
        const lastElement = this.data[lastIndex];
        delete this.data[lastIndex];
        this.length--;
        return lastElement;
    }

    // O(n)
    public insert(value: T, index: number): CustomArray<T> {
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