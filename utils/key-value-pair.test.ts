import KeyValuePair from "./key-value-pair"

describe('Key value pair', () => {
    it('Should allow the setting of a key and value', () => {
        const key = 1;
        const value = 'Value';
        const pair = new KeyValuePair(key, value);

        expect(pair.key).toBe(key);
        expect(pair.value).toBe(value);
    });
})