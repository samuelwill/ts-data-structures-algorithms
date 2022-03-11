import { Messages } from '../../utils/messages';
import { ErrorResult, OkResult, Result } from '../../utils/result';
import HashTable from '../5 - hash-table/hash-table';
import GraphEdge from './graph-edge';
import GraphVertex from './graph-vertex';

export default class Graph<T> {

    public vertices: HashTable<string, GraphVertex<T>>;
    public edges: HashTable<string, GraphEdge<T>>;
    public isDirected: boolean;

    constructor(
        isDirected: boolean
    ) {
        this.vertices = new HashTable(10);
        this.edges = new HashTable(20);
        this.isDirected = isDirected;
    }

    // We do not update the edge list when adding a vertex directly.
    // A graph with vertices, but no edges is often referred to as a
    // "trivial" graph
    public addVertex(vertex: GraphVertex<T>): Graph<T> {
        this.vertices.set(vertex.getKey(), vertex);
        return this;
    }

    public getVertexByKey(key: string): Result<GraphVertex<T>> {
        const getVertexResult = this.vertices.get(key);
        if (!getVertexResult.isValid) {
            return new ErrorResult(Messages.VertexDoesNotExist)
        }
        return new OkResult(getVertexResult.value);
    }

    public getNeighbors(vertex: GraphVertex<T>): GraphVertex<T>[] {
        return vertex.getNeighbors();
    }

    public getAllEdges(): GraphEdge<T>[] {
        return this.edges.values();
    }

    public addEdge(edge: GraphEdge<T>): Graph<T> {
        const getStartVertexResult = this.getVertexByKey(edge.startVertex.getKey());
        const getEndVertexResult = this.getVertexByKey(edge.endVertex.getKey());

        let startVertex: GraphVertex<T>;
        let endVertex: GraphVertex<T>;

        if (!getStartVertexResult.isValid) {
            this.addVertex(edge.startVertex);
            startVertex = this.getVertexByKey(edge.startVertex.getKey()).value!;
        } else {
            startVertex = getStartVertexResult.value!;
        }

        if (!getEndVertexResult.isValid) {
            this.addVertex(edge.endVertex);
            endVertex = this.getVertexByKey(edge.endVertex.getKey()).value!;
        } else {
            endVertex = getEndVertexResult.value!;
        }

        if (!this.edges.get(edge.getKey()).isValid) {
            this.edges.set(edge.getKey(), edge);
        }

        startVertex.addEdge(edge);
        if (!this.isDirected) {
            endVertex.addEdge(edge);
        }

        return this;
    }

    public getAllVertices(): GraphVertex<T>[] {
        return this.vertices.values();
    }

    public getWeight(): number {
        return this.edges.values().reduce((weight, edge) => {
            return weight + edge.weight;
        }, 0);
    }

    public getAdjacencyMatrix(): number[][] {
        const vertices = this.getAllVertices();
        const verticesIndices = this.getVerticesIndices();

        const adjacencyMatrix = Array(vertices.length)
            .fill(null)
            .map(() => Array(vertices.length).fill(Infinity));

        vertices.forEach((vertex, vertexIndex) => {
            vertex.getNeighbors().forEach(neighbor => {
                const neighborIndex = verticesIndices
                    .get(neighbor.getKey())
                    .value!;
                adjacencyMatrix[vertexIndex][neighborIndex]
                    = this.findEdge(vertex, neighbor).value?.weight;
            });
        });
        return adjacencyMatrix;
    }

    private getVerticesIndices(): HashTable<string, number> {
        const verticesIndices = new HashTable<string, number>(10);
        this.getAllVertices().forEach((vertex, index) => {
            verticesIndices.set(vertex.getKey(), index);
        });
        return verticesIndices;
    }

    private findEdge(
        startVertex: GraphVertex<T>,
        endVertex: GraphVertex<T>
    ): Result<GraphEdge<T>> {
        const getVertexResult = this.getVertexByKey(startVertex.getKey());
        if (!getVertexResult.isValid) {
            return new ErrorResult(Messages.VertexDoesNotExist);
        }
        return new OkResult(getVertexResult.value!.findEdge(endVertex).value!);
    }

}
