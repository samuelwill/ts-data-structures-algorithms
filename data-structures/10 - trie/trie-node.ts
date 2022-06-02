export default class TrieNode {
    private alphabetSize = 26;

    public children: TrieNode | undefined[];
    public isEndOfWord: boolean;

    constructor() {
        this.children = new Array(this.alphabetSize);
        this.isEndOfWord = false;
    }
}
