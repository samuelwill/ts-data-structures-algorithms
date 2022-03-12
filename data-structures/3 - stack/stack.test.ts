import Stack from './stack';

describe('Stack', () => {

    it('should allow creating an empty stack', () => {
        const stack = new Stack<number>();

        expect(stack.size).toBe(0);
        expect(stack.isEmpty()).toBe(true);
    });

    it('should allow adding to an empty stack', () => {
        const stack = new Stack<number>();

        stack.push(1);

        expect(stack.size).toBe(1);
        expect(stack.isEmpty()).toBe(false);
    });

    it('should allow adding multiple items', () => {
        const stack = new Stack<number>();

        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.size).toBe(3);
        expect(stack.isEmpty()).toBe(false);
        expect(stack.peek().value).toBe(3);
    });

    it('should allow removing item from the top of the stack', () => {
        const stack = new Stack<number>();

        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.size).toBe(3);
        expect(stack.isEmpty()).toBe(false);

        const popResult = stack.pop()

        expect(stack.size).toBe(2);
        expect(popResult.isValid).toBe(true);
        expect(popResult.value).toBe(3);
    });

    it('should allow peking at the top item on the stack', () => {
        const stack = new Stack<number>();

        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.size).toBe(3);
        expect(stack.isEmpty()).toBe(false);

        const peekResult = stack.peek()

        expect(stack.size).toBe(3);
        expect(peekResult.isValid).toBe(true);
        expect(peekResult.value).toBe(3);
    });

});
