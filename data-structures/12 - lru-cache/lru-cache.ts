import KeyValuePair from '../../utils/key-value-pair';
import LinkedListNode from '../2 - linked-list/linked-list-node';
import HashTable from '../6 - hash-table/hash-table';

export default class LRUCache<K, V> {

    private cache: HashTable<K, LinkedListNode<KeyValuePair<K, V>>>;
    // left === least recently used
    private left: LinkedListNode<KeyValuePair<K, V>>;
    // right === most recently used
    private right: LinkedListNode<KeyValuePair<K, V>>;

    public get size(): number {
        return this.cache.size;
    }

    constructor(
        private capacity: number
    ) {
        this.cache = new HashTable<K, LinkedListNode<KeyValuePair<K, V>>>(this.capacity * 2);
        const dummyKeyValuePair = new KeyValuePair({} as K, {} as V);
        this.left = new LinkedListNode<KeyValuePair<K, V>>(dummyKeyValuePair);
        this.right = new LinkedListNode<KeyValuePair<K, V>>(dummyKeyValuePair);
        this.left.next = this.right;
        this.right.previous = this.left;
    }

    public get(key: K): V | undefined {
        if (!this.cache.has(key)) {
            return undefined;
        }
        this.removeFromList(this.cache.get(key).value!);
        this.insertAtRightOfList(this.cache.get(key).value!);
        return this.cache.get(key).value!.value.value;
    }

    public put(key: K, value: V): void {
        if (this.cache.has(key)) {
            this.removeFromList(this.cache.get(key).value!);
        }
        const pair = new KeyValuePair(key, value);
        this.cache.set(key, new LinkedListNode<KeyValuePair<K, V>>(pair));
        this.insertAtRightOfList(this.cache.get(key).value!);

        if (this.cache.size > this.capacity) {
            // remove and delete LRU item
            const lru = this.left.next;
            this.removeFromList(lru!);
            this.cache.delete(lru!.value.key);
        }
    }

    private removeFromList(node: LinkedListNode<KeyValuePair<K, V>>): void {
        const prev = node.previous;
        const next = node.next;
        // we are using the dummy left and right nodes to ensure
        // that when we delete a node from the list, there is
        // always a valid previous and next node, so we can be sure
        // the prev and next have values here
        prev!.next = next;
        next!.previous = prev;
    }

    // note that the use of a dummy right node makes this much simpler
    // than it would be otherwise
    private insertAtRightOfList(node: LinkedListNode<KeyValuePair<K, V>>): void {
        // connect new node with its previous
        const prev = this.right.previous;
        prev!.next = node;
        node.previous = prev;
        // connect new node with its next
        node.next = this.right;
        this.right.previous = node;
    }
}
