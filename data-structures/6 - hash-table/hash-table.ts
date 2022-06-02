import KeyValuePair from '../../utils/key-value-pair';
import { Messages } from '../../utils/messages';
import { ErrorResult, OkResult, Result } from '../../utils/result';
import LinkedList from '../2 - linked-list/linked-list';

export default class HashTable<K, V> {

    public data: LinkedList<KeyValuePair<K, V>>[];
    public size: number;

    constructor(size: number) {
        this.data = new Array(size);
        this.size = 0;
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
        this.size++;
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

    public delete(key: K): void {
        const index = this.hash(key);
        const bucket = this.data[index];
        if (!bucket) {
            return;
        }
        const findResult = bucket.find({
            callback: (pair: KeyValuePair<K, V>) => pair.key === key
        });
        if (findResult.isValid) {
            bucket.delete(findResult.value!);
            this.size--;
        }
    }

    public has(key: K): boolean {
        return this.get(key).isValid;
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

    public values(): V[] {
        const valuesArray: V[] = [];
        for (let i = 0; i < this.data.length; ++i) {
            const bucket = this.data[i];
            if (!bucket) {
                continue;
            }
            const bucketValues = bucket.getValues();
            for (let j = 0; j < bucketValues.length; ++j) {
                valuesArray.push(bucketValues[j].value);
            }
        }
        return valuesArray;
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
