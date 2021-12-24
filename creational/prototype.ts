namespace Prototype {
  interface Copyable<T> {
    copy(): T;
  }

  type GraphConstructor = {
    startVertex?: string;
    endVertex?: string;
    weight: number;
    isDirected: boolean;
  };

  class GraphEdge implements Copyable<GraphEdge> {
    startVertex?: string;
    endVertex?: string;
    weight: number;
    isDirected: boolean;

    constructor({
      startVertex,
      endVertex,
      weight,
      isDirected,
    }: GraphConstructor) {
      this.startVertex = startVertex;
      this.endVertex = endVertex;
      this.weight = weight;
      this.isDirected = isDirected;
    }

    setStartVertex(value: string) {
      this.startVertex = value;
    }

    setEndVertex(value: string) {
      this.endVertex = value;
    }

    copy(): GraphEdge {
      return new GraphEdge({
        startVertex: this.startVertex,
        endVertex: this.endVertex,
        weight: this.weight,
        isDirected: this.isDirected,
      });
    }
  }

  const baseDirectedEdge = new GraphEdge({
    weight: 1,
    isDirected: true,
  });

  const baseInDirectedEdge = new GraphEdge({
    weight: 4,
    isDirected: false,
  });

  const edgeAB = baseDirectedEdge.copy();
  edgeAB.setStartVertex("A");
  edgeAB.setEndVertex("B");

  const edgeBC = baseInDirectedEdge.copy();
  edgeBC.setStartVertex("B");
  edgeBC.setEndVertex("C");
}

/**
 * Prototype design pattern
 *
 * Prototype design pattern provides a way to uniformly clone objects, instead of creating
 * every object manually and configure it. Creating base object and cloning only it will
 * simplify the process.
 *
 * * Pros
 *  This pattern helps if you need to create the same subclass with couple of properties changed.
 *  Makes the client code independent from the copying class. It decouples the creation of class.
 */
