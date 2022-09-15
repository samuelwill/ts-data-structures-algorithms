import DisjointSet from "./disjoint-set";

describe('Disjoint Set', () => {

    const size = 10;
    let disjointSet: DisjointSet;

    beforeEach(() => {
        disjointSet = new DisjointSet(size);
    });

    it('should create', () => {
        expect(disjointSet).toBeTruthy();
    });

    it('defaults to each vertex being in its own set', () => {
        expect(disjointSet.find(0)).toBe(0);
        expect(disjointSet.find(8)).toBe(8);
        expect(disjointSet.countOfConnectedComponents).toBe(size);
    });

    it('is able to union two vertices that are in distinct sets', () => {
        disjointSet.union(0, 1);

        expect(disjointSet.areConnected(0, 1)).toBe(true);
    });

    it('is able to union a vertex with itself', () => {
        disjointSet.union(0, 0);

        expect(disjointSet.areConnected(0, 0)).toBe(true);
    });

    it('is able to union two vertices that are already in the same set', () => {
        disjointSet.union(0, 3);
        expect(disjointSet.areConnected(0, 3)).toBe(true);

        disjointSet.union(3, 0);

        expect(disjointSet.areConnected(0, 3)).toBe(true);
    });

    it('efficiently unions sets by unioning the smaller set into the larger one', () => {
        disjointSet.union(1, 2);

        disjointSet.union(2, 3);

        expect(disjointSet.find(3)).toBe(2);
    });

    it('provides the number of connected components', () => {
        expect(disjointSet.countOfConnectedComponents).toBe(size);

        disjointSet.union(0, 1);
        expect(disjointSet.countOfConnectedComponents).toBe(size - 1);

        disjointSet.union(2, 3);
        expect(disjointSet.countOfConnectedComponents).toBe(size - 2);
    });
});
