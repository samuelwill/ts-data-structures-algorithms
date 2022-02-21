export default class MaxHeap {
    private values: number[] = [];

    constructor() {

    }

    public getSize(): number {
        return this.values.length;
    }

    public getMax(): number {
        // Todo: validation
        if (this.values.length === 0) {
            return -1;
        }
        return this.values[0];
    }

    public extractMax(): number {
        // Todo: validation
        if (this.values.length === 0) {
            return -1;
        }

        const maxValue = this.values[0];
        const valueFromBottomLeftOfHeap = this.values.pop()!;
        this.values[0] = valueFromBottomLeftOfHeap;

        let currentIndex = 0;
        let leftChildIndex = this.getLeftChildIndexFromIndex(currentIndex);
        let rightChildIndex = this.getRightChildIndexFromIndex(currentIndex);

        // while current is smaller that either child
        // swap current with smaller child
        while (
            valueFromBottomLeftOfHeap < this.values[leftChildIndex]
            || valueFromBottomLeftOfHeap < this.values[rightChildIndex]
        ) {
            const leftChildIsSmaller
                = this.values[leftChildIndex] < this.values[rightChildIndex];

            const indexToSwap = leftChildIsSmaller
                ? leftChildIndex
                : rightChildIndex;

            const valueToSwap = this.values[indexToSwap];

            this.values[indexToSwap] = valueFromBottomLeftOfHeap;
            this.values[currentIndex] = valueToSwap;

            // update while loop condition variables
            currentIndex = indexToSwap;
            leftChildIndex = this.getLeftChildIndexFromIndex(currentIndex);
            rightChildIndex = this.getRightChildIndexFromIndex(currentIndex);
        }
        return maxValue;
    }

    public insert(value: number): void {
        this.values.push(value);

        let currentIndex = this.values.length - 1;
        let parentIndex = this.getParentIndexFromIndex(currentIndex);
        let parent = this.values[parentIndex];

        // bubble up the added value while it is greater than its parent
        while (parentIndex >= 0 && value > parent) {
            // swap new value with parent
            this.values[parentIndex] = value;
            this.values[currentIndex] = parent;

            currentIndex = parentIndex;
            parentIndex = this.getParentIndexFromIndex(currentIndex);
            parent = this.values[parentIndex];
        }
    }

    private getParentIndexFromIndex(index: number): number {
        if (index <= 0) {
            return -1;
        }
        return Math.floor((index - 1) / 2);
    }

    private getLeftChildIndexFromIndex(index: number): number {
        return (index * 2) + 1;
    }

    private getRightChildIndexFromIndex(index: number): number {
        return (index * 2) + 2;
    }
}
