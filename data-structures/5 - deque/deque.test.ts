import Deque from "./deque";

describe('Queue', () => {

    it('should allow creating an empty deque', () => {
        const deque = new Deque<number>(100);

        expect(deque.isEmpty()).toBe(true);
    });

    it('should allow adding an item to the front of the deque', () => {
        const deque = new Deque<number>(100);

        deque.insertFront(1);

        expect(deque.isEmpty()).toBe(false);
    });

});
