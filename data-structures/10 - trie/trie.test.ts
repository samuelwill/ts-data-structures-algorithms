import Trie from "./trie";

describe('Trie', () => {

    let trie: Trie;

    beforeEach(() => {
        trie = new Trie();
    });

    it('should create', () => {
        expect(trie).toBeTruthy();
    });

    it('should insert a new word', () => {
        trie.insert('lake');

        expect(trie.search('lake')).toBe(true);
    });

    it('should handle inserting an empty string', () => {
        trie.insert('');

        expect(true).toBe(true);
    });

    it('should handle inserting an existing word', () => {
        const word = 'racecar';

        trie.insert(word);
        expect(trie.search(word)).toBe(true);

        trie.insert(word);
        expect(trie.search(word)).toBe(true);
    });

});
