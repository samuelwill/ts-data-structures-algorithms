import isSorted from './is-sorted';
import merge from "./merge-sorted-arrays"

describe('Merge sorted arrays', () => {

    it('Should handle two empty arrays', () => {
        const arr1 = [];
        const arr2 = [];

        const result = merge(arr1, arr2);

        expect(result.length).toBe(0);
        expect(isSorted(result)).toBe(true);
    });

    it('Should handle first array being empty', () => {
        const arr1 = [];
        const arr2 = [1, 2, 3];

        const result = merge(arr1, arr2);

        expect(result.length).toBe(3);
        expect(isSorted(result)).toBe(true);
    });

    it('Should handle second array being empty', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [];

        const result = merge(arr1, arr2);

        expect(result.length).toBe(3);
        expect(isSorted(result)).toBe(true);
    });

    it('Should merge two sorted arrays', () => {
        const arr1 = [1, 3, 5];
        const arr2 = [2, 4, 6];

        const result = merge(arr1, arr2);

        expect(result.length).toBe(6);
        expect(isSorted(result)).toBe(true);
    });

    it('Should merge two sorted arrays with negative numbers', () => {
        const arr1 = [-3, 1, 3, 5];
        const arr2 = [-5, -1, 2, 4, 6];

        const result = merge(arr1, arr2);

        expect(result.length).toBe(9);
        expect(isSorted(result)).toBe(true);
    });


});
