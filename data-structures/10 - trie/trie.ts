import TrieNode from "./trie-node";

export default class Trie {
    private root: TrieNode | undefined;
    private alphabetSize = 26;

    constructor() {
        this.root = undefined;
    }

    // T: O(c) - where 'c' is the number of chars in the inserted word
    public insert(word: string): void {
        if (!this.root) {
            this.root = new TrieNode();
        }
        let currNode = this.root;
        let indexOfCurrChar: number;

        for (let level = 0; level < word.length; ++level) {
            indexOfCurrChar = this.getZeroIndexedCharCode(word[level]);
            if (!currNode.children[indexOfCurrChar]) {
                currNode.children[indexOfCurrChar] = new TrieNode();
            }
            currNode = currNode.children[indexOfCurrChar];
        }
        currNode.isEndOfWord = true;
    }

    // T: O(c) - where 'c' is the number of chars in the search word
    public search(word: string): boolean {
        if (!this.root) {
            return false;
        }
        let currNode = this.root;
        let indexOfCurrChar: number;

        for (let level = 0; level < word.length; ++level) {
            indexOfCurrChar = this.getZeroIndexedCharCode(word[level]);
            if (!currNode.children[indexOfCurrChar]) {
                return false;
            }
            currNode = currNode.children[indexOfCurrChar];
        }
        return currNode.isEndOfWord;
    }

    public delete(word: string): void {
        this.root = this.deleteHelper(this.root, word, 0);
    }

    private deleteHelper(
        currNode: TrieNode | undefined,
        word: string,
        depth: number = 0
    ): TrieNode | undefined {
        if (!currNode) {
            return currNode;
        }
        // last char of the word
        if (depth === word.length) {
            if (!currNode || this.isEmpty(currNode)) {
                return undefined;
            }
            currNode.isEndOfWord = false;
            return currNode
        }
        const index = this.getZeroIndexedCharCode(word[depth]);
        currNode!.children[index] = this.deleteHelper(
            currNode.children[index],
            word,
            depth + 1
        );
        if (this.isEmpty(currNode) && !currNode.isEndOfWord) {
            return undefined;
        }
        return currNode;
    }

    private isEmpty(node: TrieNode | undefined): boolean {
        if (!node) {
            return true;
        }
        for (let i = 0; i < this.alphabetSize; ++i) {
            if (node.children[i]) {
                return false;
            }
        }
        return true;
    }

    private getZeroIndexedCharCode(char: string): number {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}
