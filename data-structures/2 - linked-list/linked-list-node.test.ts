import LinkedListNode from './linked-list-node';

describe('Linked list node', () => {

    it('should allow creating a new list node', () => {
        const node = new LinkedListNode(1);

        expect(node.value).toBe(1);
        expect(node.next).toBe(undefined);
        expect(node.previous).toBe(undefined);
    });

    it('should allow creating a new list node with next node', () => {
        const nextNode = new LinkedListNode(2);
        const node = new LinkedListNode(1, nextNode);

        expect(node.value).toBe(1);
        expect(node.next).toBe(nextNode);
        expect(node.previous).toBe(undefined);
    });

    it('should allow creating a new list node with next and previous nodes', () => {
        const nextNode = new LinkedListNode(2);
        const previousNode = new LinkedListNode(0);
        const node = new LinkedListNode(1, nextNode, previousNode);

        expect(node.value).toBe(1);
        expect(node.next).toBe(nextNode);
        expect(node.previous).toBe(previousNode);
    });

    it('should allow setting a next node', () => {
        const node = new LinkedListNode(1);
        const nextNode = new LinkedListNode(2);

        node.next = nextNode;

        expect(node.value).toBe(1);
        expect(node.next).toBe(nextNode);
        expect(node.previous).toBe(undefined);
    });

    it('should allow setting a previous node', () => {
        const node = new LinkedListNode(1);
        const previousNode = new LinkedListNode(0);

        node.previous = previousNode;

        expect(node.value).toBe(1);
        expect(node.next).toBe(undefined);
        expect(node.previous).toBe(previousNode);
    });

});
