import MaxHeap from './max-heap';

describe('max heap', () => {

    it('should allow creating an empty heap', () => {
        const heap = new MaxHeap();
        expect(heap.getSize()).toBe(0);
    });

    it('should support adding items', () => {
        const heap = new MaxHeap();
        heap.insert(1);
        heap.insert(2);
        heap.insert(3);

        expect(heap.getSize()).toBe(3);
    });


    it('should add items and maintain max heap property', () => {
        const heap = new MaxHeap();
        heap.insert(1);
        heap.insert(2);
        heap.insert(3);

        expect(heap.getMax()).toBe(3);
    });

    it('shoud support removing the max value from the heap', () => {
        const heap = new MaxHeap();
        heap.insert(1);
        heap.insert(2);
        heap.insert(3);

        expect(heap.extractMax()).toBe(3);
        expect(heap.getMax()).toBe(2);
    });
});
