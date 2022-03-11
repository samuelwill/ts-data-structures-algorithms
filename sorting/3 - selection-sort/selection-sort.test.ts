import isSorted from '../../utils/is-sorted';
import selectionSort from './selection-sort';

describe('Insertion sort', () => {

    it('Should handle an empty list', () => {
        const arr = [];
        selectionSort(arr);

        expect(arr.length).toBe(0);
        expect(isSorted(arr)).toBe(true);
    });

    it('Should handle an array with one element', () => {
        const arr = [1];
        selectionSort(arr);

        expect(arr.length).toBe(1);
        expect(arr[0]).toBe(1);
        expect(isSorted(arr)).toBe(true);
    });

    it('Should handle an already sorted array', () => {
        const arr = [1, 2, 3, 4, 5];
        selectionSort(arr);

        expect(isSorted(arr)).toBe(true);
    });

    it('Should sort an unsorted array', () => {
        const arr = [4, 5, 2, 1, 7];
        selectionSort(arr);

        expect(isSorted(arr)).toBe(true);
    });

    it('Should sort an unsorted array with negative numbers', () => {
        const arr = [4, 5, -2, -1, 7];
        selectionSort(arr);

        expect(isSorted(arr)).toBe(true);
    });

});
