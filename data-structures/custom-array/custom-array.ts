import { ErrorResult, OkResult, Result } from "../../utils/result";
import { Messages } from '../../utils/messages';

interface ICustomArrayData<T> {
    [key: number]: T
}

export default class CustomArray<T> {

    public length = 0;
    public data: ICustomArrayData<T> = {};

    // O(1)
    public get(index: number): Result<T> {
        if (!this.indexIsInBounds(index)) {
            return new ErrorResult(Messages.IndexOutOfBounds);
        }
        return new OkResult(this.data[index]);
    }

    // O(1)
    public push(value: T): CustomArray<T> {
        this.data[this.length] = value;
        this.length++;
        return this;
    }

    // O(1)
    public pop(): Result<T> {
        if (this.length === 0) {
            return new ErrorResult(Messages.EmptyArray);
        }
        const lastIndex = this.length - 1;
        const lastElement = this.data[lastIndex];
        delete this.data[lastIndex];
        this.length--;
        return new OkResult(lastElement);
    }

    // O(n)
    public insert(value: T, index: number): Result<CustomArray<T>> {
        if (!this.indexIsInBounds(index)) {
            return new ErrorResult(Messages.IndexOutOfBounds);
        }
        this.shiftElementsRightStartingAtIndex(index);
        this.data[index] = value;
        return new OkResult(this);
    }

    // O(n)
    public delete(index: number): Result<T> {
        if (!this.indexIsInBounds(index)) {
            return new ErrorResult(Messages.IndexOutOfBounds);
        }
        const deletedElement = this.data[index];
        delete this.data[index];
        this.shiftElementsLeftStartingAtIndex(index);
        return new OkResult(deletedElement);
    }

    private indexIsInBounds(index: number): boolean {
        if (this.length === 0) {
            return false;
        }
        if (index === 0) {
            return true;
        }
        return index > 0 && index < this.length;
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
