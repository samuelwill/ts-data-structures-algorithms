import LRUCache from './lru-cache';

describe('LRU Cache', () => {

    let cache: LRUCache<number, number>;

    beforeEach(() => {
        cache = new LRUCache<number, number>(3);
    });

    it('should support adding an item', () => {
        cache.put(1, 1);

        expect(cache.size).toBe(1);
    });

    it('should support getting a value that exists', () => {
        cache.put(1, 2);

        const result = cache.get(1);
        expect(result).toBe(2);
    });

    it('should handle getting a value that does not exist', () => {
        const result = cache.get(10);
        expect(result).toBeUndefined();
    });

    it('should remove least recently used item when capacity is met', () => {
        cache.put(1, 1);
        cache.put(2, 2);
        cache.put(3, 3);

        // max capacity of cache is set to 3
        expect(cache.size).toBe(3);

        cache.put(4, 4);

        expect(cache.size).toBe(3);
        expect(cache.get(1)).toBeUndefined();
        expect(cache.get(4)).toBe(4);
    });
});
