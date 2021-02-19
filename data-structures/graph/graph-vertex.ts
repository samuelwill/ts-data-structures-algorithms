import { Messages } from '../../utils/messages';
import { ErrorResult, OkResult, Result } from '../../utils/result';
import GraphEdge from './graph-edge';
import LinkedList from '../linked-list/linked-list';

export default class GraphVertex<T> {

    public edges: LinkedList<GraphEdge<T>>;

    constructor(
        public value: T
    ) { }

    public addEdge(edge: GraphEdge<T>): Result<GraphVertex<T>> {
        if (!this.isEdgeValid(edge)) {
            return new ErrorResult(Messages.EdgeDoesNotIncludeCurrentVertex);
        }
        this.edges.append(edge);
        return new OkResult(this);
    }

    public deleteEdge(edge: GraphEdge<T>): Result<GraphEdge<T>> {
        const deleteResult = this.edges.delete(edge);
        if (!deleteResult.isValid) {
            return new ErrorResult(Messages.EdgeNotFound);
        }
        return new OkResult(deleteResult.value);
    }

    public getNeighbors(): GraphVertex<T>[] {
        const edges = this.edges.getValues();
        return edges.map(edge => this.getOtherVertexFromEdge(edge));
    }

    public getEdges(): GraphEdge<T>[] {
        return this.edges.getValues();
    }

    public getKey(): string {
        return new String(this.value).toString();
    }

    public findEdge(vertex: GraphVertex<T>): Result<GraphEdge<T>> {
        const findEdgeResult = this.edges.find({
            callback: (edge: GraphEdge<T>) => {
                return edge.startVertex === vertex
                    || edge.endVertex === vertex;
            }
        });
        if (!findEdgeResult.isValid) {
            return new ErrorResult(Messages.EdgeNotFound);
        }
        return new OkResult(findEdgeResult.value);
    }

    private getOtherVertexFromEdge(edge: GraphEdge<T>): GraphVertex<T> {
        return edge.startVertex === this
            ? edge.endVertex
            : edge.startVertex;
    }

    private isEdgeValid(edge: GraphEdge<T>): boolean {
        return edge.startVertex === this
            || edge.endVertex === this;
    }

}
