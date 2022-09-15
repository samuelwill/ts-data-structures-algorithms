export default class DisjointSet {

    private representatives: number[];
    private sizes: number[];

    constructor(size: number) {
        this.representatives = Array(size);
        for (let i = 0; i < this.representatives.length; ++i) {
            this.representatives[i] = i;
        }
        this.sizes = Array(size).fill(1);
    }

    public find(vertex: number): number {
        if (this.representatives[vertex] === vertex) {
            return vertex;
        }
        const representative = this.find(this.representatives[vertex]);
        this.representatives[vertex] = representative;
        return representative;
    }

    public union(vertex1: number, vertex2: number): void {
        const representative1 = this.find(vertex1);
        const representative2 = this.find(vertex2);

        if (representative1 === representative2) {
            return;
        }

        const largerSet = this.sizes[representative1] > this.sizes[representative2]
            ? representative1
            : representative2;

        const smallerSet = largerSet === representative1
            ? representative2
            : representative1;

        this.representatives[smallerSet] = largerSet;
        this.sizes[largerSet] += this.sizes[smallerSet];
    }
}
