import isSorted from './is-sorted';

describe('isSorted', () => {

    it('Should handle an empty array', () => {
        const arr = [];
        const result = isSorted(arr);

        expect(result).toBe(true);
    });

    it('Should handle an array with one element', () => {
        const arr = [1];
        const result = isSorted(arr);

        expect(result).toBe(true);
    });

    it('Should handle an unsorted array', () => {
        const arr = [3, 2, 1];
        const result = isSorted(arr);

        expect(result).toBe(false);
    });

    it('Should handle a sorted array with negative numbers', () => {
        const arr = [-3, -2, 0, 1];
        const result = isSorted(arr);

        expect(result).toBe(true);
    });

    it('Should handle an unsorted array with negative numbers', () => {
        const arr = [-1, 2, -3, 4];
        const result = isSorted(arr);

        expect(result).toBe(false);
    });

});
