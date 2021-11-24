namespace Iterator {
  type TreeIteratorTypes = "BFS" | "DFS";
  interface TreeIterator<T> {
    [Symbol.iterator](): Generator<TreeNode<T>>;
  }

  class TreeNode<T> {
    constructor(
      public value: T,
      public left?: TreeNode<T>,
      public right?: TreeNode<T>
    ) {}
  }

  class Tree<T> {
    constructor(public root: TreeNode<T>) {}

    createIterator(type: TreeIteratorTypes): TreeIterator<T> {
      if (type === "DFS") return new DepthFirstIterator(this);
      if (type === "BFS") return new BreadFirstIterator(this);
      throw new Error("Not supported iterator");
    }
  }

  class DepthFirstIterator<T> implements TreeIterator<T> {
    constructor(private readonly tree: Tree<T>) {}

    *[Symbol.iterator]() {
      const root = this.tree.root;

      const stack: TreeNode<T>[] = [];
      stack.push(root);

      while (stack.length) {
        const node = stack.pop()!;

        yield node;

        if (node?.right) stack.push(node.right);
        if (node?.left) stack.push(node.left);
      }
    }
  }

  class BreadFirstIterator<T> implements TreeIterator<T> {
    constructor(private readonly tree: Tree<T>) {}

    *[Symbol.iterator]() {
      const root = this.tree.root;

      const queue: TreeNode<T>[] = [];
      queue.push(root);

      while (queue.length) {
        const node = queue.shift()!;

        yield node;

        if (node?.right) queue.push(node.right);
        if (node?.left) queue.push(node.left);
      }
    }
  }

  function iterateTree(tree: Tree<number>) {
    const treeBfsIterator = tree.createIterator("BFS");
    const treeDfsIterator = tree.createIterator("DFS");

    for (const iterator of treeBfsIterator) {
      console.log(iterator);
    }

    for (const iterator of treeDfsIterator) {
      console.log(iterator);
    }
  }
}

/**
 * Iterator design pattern cares about iterating for collection,
 * It is defined separately outside that collection.
 *
 * Iterator pattern pros
 *  * Single responsibility principle, collection should not care about how to iterate himself.
 *
 * Iterator patter cons
 *  * Overkill for simple collection which can implement with arrays.
 */
