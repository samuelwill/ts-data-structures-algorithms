import KeyValuePair from '../utils/key-value-pair';
import { Messages } from '../utils/messages';
import { ErrorResult, OkResult, Result } from '../utils/result';
import LinkedList from './linked-list';

export default class HashTable<K, V> {

    public data: LinkedList<KeyValuePair<K, V>>[];

    constructor(size: number) {
        this.data = new Array(size);
    }

    // O(1)
    public set(key: K, value: V): void {
        const index = this.hash(key);
        const pair = new KeyValuePair(key, value);
        if (!this.data[index]) {
            this.data[index] = new LinkedList<KeyValuePair<K, V>>(pair);
        } else {
            this.data[index].append(pair);
        }
    }

    // O(1)
    public get(key: K): Result<V> {
        const index = this.hash(key);
        const bucket = this.data[index];
        if (!bucket) {
            return new ErrorResult(Messages.NoDataForKey);
        }
        const bucketValues = bucket.getValues();
        for (let i = 0; i < bucketValues.length; ++i) {
            if (bucketValues[i].key === key) {
                return new OkResult(bucketValues[i].value);
            }
        }
        return new ErrorResult(Messages.NoDataForKey);
    }

    // O(n)
    public keys(): K[] {
        const keysArray: K[] = [];
        for (let i = 0; i < this.data.length; ++i) {
            const bucket = this.data[i];
            if (!bucket) {
                continue;
            }
            const bucketValues = bucket.getValues();
            for (let j = 0; j < bucketValues.length; ++j) {
                keysArray.push(bucketValues[j].key);
            }
        }
        return keysArray;
    }

    // O(n)
    private hash(key: K): number {
        const keyString = new String(key);
        let hash = 0;
        for (let i = 0; i < keyString.length; ++i) {
            hash = (hash + keyString.charCodeAt(i) * i) % this.data.length;
        }
        return hash;
    }
}