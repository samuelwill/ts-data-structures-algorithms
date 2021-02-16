import GraphVertex from './graph-vertex';

export default class GraphEdge<T> {

    constructor(
        public startVertex: GraphVertex<T>,
        public endVertex: GraphVertex<T>,
        public weight: number = 0
    ) { }

    public reverse(): GraphEdge<T> {
        const temp = this.startVertex;
        this.startVertex = this.endVertex;
        this.endVertex = temp;
        return this;
    }

    public getKey(): string {
        const startVertexKey = this.startVertex.getKey();
        const endVertexKey = this.endVertex.getKey();
        return `${startVertexKey}_${endVertexKey}`;
    }
}