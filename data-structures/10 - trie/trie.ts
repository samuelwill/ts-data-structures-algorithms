import TrieNode from "./trie-node";

export default class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    public insert(word: string): void {
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

    public search(word: string): boolean {
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

    private getZeroIndexedCharCode(char: string): number {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}
