import Queue from './queue';

describe('Queue', () => {

    it('should allow creating an empty queue', () => {
        const queue = new Queue<number>();

        expect(queue.count).toBe(0);
        expect(queue.isEmpty()).toBe(true);
    });

    it('should allow enqueuing to an empty queue', () => {
        const queue = new Queue<number>();

        queue.enqueue(1);

        expect(queue.count).toBe(1);
        expect(queue.isEmpty()).toBe(false);
    });

    it('should allow enqueuing multiple items', () => {
        const queue = new Queue<number>();

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        expect(queue.count).toBe(3);
        expect(queue.isEmpty()).toBe(false);
        expect(queue.peek().value).toBe(1);
    });

    it('should allow dequeuing', () => {
        const queue = new Queue<number>();

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        expect(queue.count).toBe(3);
        expect(queue.isEmpty()).toBe(false);
        expect(queue.peek().value).toBe(1);

        const dequeueResult = queue.dequeue();

        expect(dequeueResult.isValid).toBe(true);
        expect(dequeueResult.value).toBe(1);
        expect(queue.count).toBe(2);
        expect(queue.isEmpty()).toBe(false);
        expect(queue.peek().value).toBe(2);
    });

});
