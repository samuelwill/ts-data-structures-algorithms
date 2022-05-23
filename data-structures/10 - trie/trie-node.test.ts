import TrieNode from './trie-node';

describe('Trie Node', () => {
    const alphabetSize = 26;

    it('should have a collection of \'next letters\' empty by default', () => {
        const node = new TrieNode();
        expect(node.children.length).toBe(alphabetSize);
        expect(node.children[0]).toBe(undefined);
        expect(node.children[alphabetSize - 1]).toBe(undefined);
    });

    it('should indicate whether current node is the end of a word', () => {
        const node = new TrieNode();
        expect(node.isEndOfWord).toBe(false);
    });

});
