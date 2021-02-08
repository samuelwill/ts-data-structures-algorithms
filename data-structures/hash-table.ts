import KeyValuePair from '../utils/key-value-pair';
import LinkedList from './linked-list';

export default class HashTable<K, V> {

    public data: LinkedList<KeyValuePair<K, V>>[];

    constructor(size: number) {
        this.data = new Array(size);
    }

    // O(1)
    public set(key: K, value: V): void {
        const idx = this.hash(key);
        const pair = new KeyValuePair(key, value);
        if (!this.data[idx]) {
            this.data[idx] = new LinkedList<KeyValuePair<K, V>>(pair);
        } else {
            this.data[idx].append(pair);
        }
    }

    // O(1)
    public get(key: K): V | undefined {
        const idx = this.hash(key);
        const bucket = this.data[idx];
        if (!bucket) {
            return undefined;
        }
        if (bucket.count === 1 && bucket[0][0] === key) {
            return bucket[0][1];
        }
        for (let i = 0; i < bucket.count; ++i) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return undefined;
    }

    // O(n)
    public keys(): K[] {
        const keysArray: K[] = [];
        for (let i = 0; i < this.data.length; ++i) {
            if (!this.data[i]) {
                continue;
            }
            for (let j = 0; j < this.data[i].count; ++j) {
                keysArray.push(this.data[i][j][0]);
            }
        }
        return keysArray;
    }

    // O(1)
    private hash(key: K): number {
        const keyString = new String(key);
        let hash = 0;
        for (let i = 0; i < keyString.length; ++i) {
            hash = (hash + keyString.charCodeAt(i) * i) % this.data.length;
        }
        return hash;
    }
}