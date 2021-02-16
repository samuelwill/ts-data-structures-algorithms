import { Messages } from "../../utils/messages";
import CustomArray from "./custom-array";

describe('Custom array', () => {

    it('should be empty when first constructed', () => {
        const arr = new CustomArray<string>();

        expect(arr.length).toBe(0);
    });

    it('should return error result if accessing out of bound index', () => {
        const arr = new CustomArray<string>();
        const getResult = arr.get(10);

        expect(getResult.isValid).toBe(false);
        expect(getResult.error).toBe(Messages.IndexOutOfBounds);
    });

    it('should support adding an element', () => {
        const arr = new CustomArray<string>();
        const testString = 'hello';
        arr.push(testString);

        expect(arr.length).toBe(1);

        const getResult = arr.get(0);
        expect(getResult.isValid).toBe(true);
        expect(getResult.value).toBe(testString);
    });

    it('should add new elements to the end of the array', () => {
        const string1 = 'hello';
        const string2 = 'goodbye';
        const arr = new CustomArray<string>()
            .push(string1)
            .push(string2);

        const getResult = arr.get(1);
        expect(getResult.isValid).toBe(true);
        expect(getResult.value).toBe(string2);
    })

});