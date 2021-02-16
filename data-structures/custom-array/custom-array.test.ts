import { Messages } from "../../utils/messages";
import CustomArray from "./custom-array";

describe('Custom array', () => {

    const string1 = 'hello';
    const string2 = 'goodbye';
    let arr: CustomArray<string>;

    beforeEach(() => {
        arr = new CustomArray<string>()
            .push(string1)
            .push(string2);
    });

    it('should be empty when first constructed', () => {
        const emptyArray = new CustomArray<string>();
        expect(emptyArray.length).toBe(0);
    });

    it('should return an error result when accessing an invalid index', () => {
        const getResult = arr.get(10);

        expect(getResult.isValid).toBe(false);
        expect(getResult.error).toBe(Messages.IndexOutOfBounds);
    });

    it('should add new elements to the end of the array', () => {
        const newValue = 'value';
        arr.push(newValue);

        expect(arr.length).toBe(3);

        const getResult = arr.get(2);
        expect(getResult.isValid).toBe(true);
        expect(getResult.value).toBe(newValue);
    });

    it('should remove elements from the end of the array', () => {
        const removeResult = arr.pop();
        expect(removeResult.isValid).toBe(true);
        expect(removeResult.value).toBe(string2);
        expect(arr.length).toBe(1);

        const getResult = arr.get(0);
        expect(getResult.value).toBe(string1);
    });

    it('should handle trying to remove element from empty array', () => {
        const emptyArray = new CustomArray<string>();
        expect(emptyArray.length).toBe(0);

        const removeResult = emptyArray.pop();
        expect(removeResult.isValid).toBe(false);
        expect(removeResult.error).toBe(Messages.EmptyArray);
        expect(emptyArray.length).toBe(0);
    });

    it('should insert an element at the provided index', () => {
        const newValue = 'value';
        const insertionResult = arr.insert(newValue, 1);
        expect(insertionResult.isValid).toBe(true);

        const getResult = arr.get(1);
        expect(getResult.isValid).toBe(true);
        expect(getResult.value).toBe(newValue);

        expect(arr.length).toBe(3);
    });

    it('should handle inserting an element at an invalid index', () => {
        const newValue = 'value';
        const insertionResult = arr.insert(newValue, 10);
        expect(insertionResult.isValid).toBe(false);

        const getResult = arr.get(0);
        expect(getResult.isValid).toBe(true);
        expect(getResult.value).toBe(string1);
    });

    it('should delete an element at the provided index', () => {
        const deletionResult = arr.delete(0);
        expect(deletionResult.isValid).toBe(true);
        expect(arr.length).toBe(1);

        const getResult = arr.get(0);
        expect(getResult.isValid).toBe(true);
        expect(getResult.value).toBe(string2);
    });

    it('should handle deleting an invalid index', () => {
        const deletionResult = arr.delete(10);
        expect(deletionResult.isValid).toBe(false);
        expect(arr.length).toBe(2);

        const getResult = arr.get(0);
        expect(getResult.isValid).toBe(true);
        expect(getResult.value).toBe(string1);
    });

});