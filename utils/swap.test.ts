import { Messages } from './messages';
import swap from './swap';

describe('Swap utility function', () => {

    let arr: number[];

    beforeEach(() => {
        arr = [1, 2];
    });

    it('Should swap two elements in an array', () => {
        const swapResult = swap(arr, 0, 1);

        expect(swapResult.isValid).toBe(true);
        expect(arr[0]).toBe(2);
        expect(arr[1]).toBe(1);
    });

    it('Should handle swapping an element with itself', () => {
        const swapResult = swap(arr, 0, 0);

        expect(swapResult.isValid).toBe(true);
        expect(arr[0]).toBe(1);
        expect(arr[1]).toBe(2);
    });

    it('Should handle when first index is out of range', () => {
        const swapResult = swap(arr, 9, 1);

        expect(swapResult.isValid).toBe(false);
        expect(swapResult.error).toBe(Messages.IndexOutOfBounds);
        expect(arr[0]).toBe(1);
        expect(arr[1]).toBe(2);
    });

    it('Should handle when second index is out of range', () => {
        const swapResult = swap(arr, 0, 9);

        expect(swapResult.isValid).toBe(false);
        expect(swapResult.error).toBe(Messages.IndexOutOfBounds);
        expect(arr[0]).toBe(1);
        expect(arr[1]).toBe(2);
    });

    it('Should handle negative index', () => {
        const swapResult = swap(arr, 0, -1);

        expect(swapResult.isValid).toBe(false);
        expect(swapResult.error).toBe(Messages.IndexOutOfBounds);
        expect(arr[0]).toBe(1);
        expect(arr[1]).toBe(2);
    });
});
