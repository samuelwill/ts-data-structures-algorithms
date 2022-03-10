import indexOutOfBounds from './index-out-of-bounds';

describe('Index of out bounds', () => {

    let arr: number[];

    beforeEach(() => {
        arr = [1, 2];
    });

    it('Should return false when provided index is in bounds', () => {
        const result = indexOutOfBounds(arr, 0);
        expect(result).toBe(false);
    })

    it('Should return true when index is too large', () => {
        const result = indexOutOfBounds(arr, 9);
        expect(result).toBe(true);
    });

    it('Should return true when index is negative', () => {
        const result = indexOutOfBounds(arr, -1);
        expect(result).toBe(true);
    });
});
