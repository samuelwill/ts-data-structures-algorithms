export default class KeyValuePair<K, V> {

    public key: K;
    public value: V;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}