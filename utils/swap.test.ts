import swap from './swap';

describe('Swap utility', () => {
    it('should swap two elements in an array', () => {
        const arr = [1, 2];
        swap(arr, 0, 1);

        expect(arr[0]).toBe(2);
        expect(arr[1]).toBe(1);
    });
});
