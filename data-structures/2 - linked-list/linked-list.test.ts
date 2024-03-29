import LinkedList from './linked-list'

describe('linked list', () => {

    it('should allow creating an empty list', () => {
        const list = new LinkedList<number>();

        expect(list.count).toBe(0);
        expect(list.isEmpty()).toBe(true);
    });

    it('should allow creating a list with a starting item', () => {
        const value = 10;
        const list = new LinkedList<number>(value);

        expect(list.count).toBe(1);
        expect(list.head?.value).toBe(value);
        expect(list.tail?.value).toBe(value);
        expect(list.isEmpty()).toBe(false);
    });

    it('should allow prepending to an empty list', () => {
        const value = 10;
        const list = new LinkedList<number>();

        list.prepend(value);

        expect(list.count).toBe(1);
        expect(list.head?.value).toBe(value);
        expect(list.tail?.value).toBe(value);
        expect(list.isEmpty()).toBe(false);
        expect(list.find({
            callback: (val: number) => val === value
        }).isValid).toBe(true);
    });

    it('should allow prepending to a list with items', () => {
        const value1 = 1;
        const value2 = 2;
        const list = new LinkedList<number>(value1);

        list.prepend(value2);

        expect(list.count).toBe(2);
        expect(list.head?.value).toBe(value2);
        expect(list.tail?.value).toBe(value1);
        expect(list.isEmpty()).toBe(false);
        expect(list.find({
            callback: (val: number) => val === value2
        }).isValid).toBe(true);
    });

    it('should allow appending to an empty list', () => {
        const value = 1;
        const list = new LinkedList<number>();

        list.append(value);

        expect(list.count).toBe(1);
        expect(list.head?.value).toBe(value);
        expect(list.tail?.value).toBe(value);
        expect(list.isEmpty()).toBe(false);
        expect(list.find({
            callback: (val: number) => val === value
        }).isValid).toBe(true);
    });

    it('should allow appending to a list with items', () => {
        const value1 = 1;
        const value2 = 2;
        const list = new LinkedList<number>(value1);

        list.append(value2);

        expect(list.count).toBe(2);
        expect(list.head?.value).toBe(value1);
        expect(list.tail?.value).toBe(value2);
        expect(list.isEmpty()).toBe(false);
        expect(list.find({
            callback: (val: number) => val === value2
        }).isValid).toBe(true);
    });

    it('should handle inserting a value in the middle of the list', () => {
        const value1 = 1;
        const value2 = 2;
        const list = new LinkedList(value1);
        list.append(value2);

        expect(list.count).toBe(2);
        expect(list.head?.value).toBe(value1);
        expect(list.tail?.value).toBe(value2);

        const value3 = 3;
        list.insert(value3, 1);

        expect(list.count).toBe(3);
        expect(list.head?.value).toBe(value1);
        expect(list.tail?.value).toBe(value2);
    });

    it('should handle inserting a value at an invalid index', () => {
        const value1 = 1;
        const value2 = 2;
        const invalidIndex = 10;
        const list = new LinkedList<number>(value1);

        expect(list.insert(value2, invalidIndex).isValid).toBe(false);
        expect(list.count).toBe(1);
        expect(list.head?.value).toBe(value1);
        expect(list.tail?.value).toBe(value1);
        expect(list.isEmpty()).toBe(false);
    });

    it('should allow inserting a value at the head', () => {
        const value1 = 1;
        const value2 = 2;
        const value3 = 3;
        const list = new LinkedList<number>(value1);
        list.append(value2);
        expect(list.count).toBe(2);

        const insertionResult = list.insert(value3, 0);

        expect(insertionResult.isValid).toBe(true);
        expect(list.count).toBe(3);
        expect(list.head?.value).toBe(value3);
        expect(list.tail?.value).toBe(value2);
        expect(list.isEmpty()).toBe(false);
    });

    it('should handle deleting a value at the head of the list', () => {
        const value1 = 1;
        const value2 = 2;
        const list = new LinkedList(value1);
        list.append(value2);

        expect(list.count).toBe(2);
        expect(list.head?.value).toBe(value1);
        expect(list.tail?.value).toBe(value2);

        list.delete(value1);

        expect(list.count).toBe(1);
        expect(list.head?.value).toBe(value2);
        expect(list.tail?.value).toBe(value2);
    });

    it('should handle deleting a value in the middle of the list', () => {
        const value1 = 1;
        const value2 = 2;
        const value3 = 3;
        const list = new LinkedList(value1);
        list.append(value2);
        list.append(value3);

        expect(list.count).toBe(3);
        expect(list.head?.value).toBe(value1);
        expect(list.tail?.value).toBe(value3);

        list.delete(value2);

        expect(list.count).toBe(2);
        expect(list.head?.value).toBe(value1);
        expect(list.tail?.value).toBe(value3);
    });

    it('should handle reversing the values in the list', () => {
        const value1 = 1;
        const value2 = 2;
        const value3 = 3;
        const list = new LinkedList(value1);
        list.append(value2);
        list.append(value3);

        expect(list.count).toBe(3);
        expect(list.head?.value).toBe(value1);
        expect(list.tail?.value).toBe(value3);

        list.reverse();

        expect(list.count).toBe(3);
        expect(list.head?.value).toBe(value3);
        expect(list.tail?.value).toBe(value1);
    });

    it('should handle returning all of the values in the list', () => {
        const value1 = 1;
        const value2 = 2;
        const value3 = 3;
        const list = new LinkedList(value1);
        list.append(value2);
        list.append(value3);

        expect(list.count).toBe(3);
        expect(list.head?.value).toBe(value1);
        expect(list.tail?.value).toBe(value3);

        const values = list.getValues();

        expect(values.length).toBe(3);
        expect(values[0]).toBe(1);
        expect(values[2]).toBe(3);
    });

    it('should handle finding a value in the list', () => {
        const value1 = 1;
        const value2 = 2;
        const value3 = 3;
        const list = new LinkedList(value1);
        list.append(value2);
        list.append(value3);

        expect(list.count).toBe(3);
        expect(list.head?.value).toBe(value1);
        expect(list.tail?.value).toBe(value3);

        const callback = (val: number) => val === value2;
        const findResult = list.find({ callback });

        expect(findResult.isValid).toBe(true);
        expect(findResult.value).toBe(value2);
    });

});
