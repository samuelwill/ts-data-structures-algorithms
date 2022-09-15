import DisjointSet from "./disjoint-set";

describe('Disjoint Set', () => {

    let disjointSet: DisjointSet;

    beforeEach(() => {
        const size = 10;
        disjointSet = new DisjointSet(size);
    });

    it('should create', () => {
        expect(disjointSet).toBeTruthy();
    });

    it('defaults to each vertex being in its own set', () => {
        expect(disjointSet.find(0)).toBe(0);
        expect(disjointSet.find(8)).toBe(8);
    });

    it('is able to union two vertices that are in distinct sets', () => {
        disjointSet.union(0, 1);

        expect(disjointSet.find(0)).toBe(1);
        expect(disjointSet.find(1)).toBe(1);
    });

    it('is able to union a vertex with itself', () => {
        disjointSet.union(0, 0);

        expect(disjointSet.find(0)).toBe(0);
    });

    it('is able to union two vertices that are already in the same set', () => {
        disjointSet.union(0, 3);
        expect(disjointSet.find(0)).toBe(3);

        disjointSet.union(3, 0);

        expect(disjointSet.find(3)).toBe(3);
    });

    it('efficiently unions sets by unioning the smaller set into the larger one', () => {
        disjointSet.union(1, 2);

        disjointSet.union(2, 3);

        expect(disjointSet.find(3)).toBe(2);
    });
});
