class ObjectPool<T> {
  private objects: T[] = [];
  constructor(private factory: () => T) {}

  public acquire(): T {
    if (this.objects.length === 0) {
      return this.factory();
    }
    return this.objects.pop()!;
  }

  public release(obj: T) {
    this.objects.push(obj);
  }
}

class HardToMakeResource {
  constructor(public id: number) {}
}

class HardToMakeResourceFactory {
  private id = 0;
  public create() {
    return new HardToMakeResource(this.id++);
  }
}

const factory = new HardToMakeResourceFactory();
const resourcePool = new ObjectPool<HardToMakeResource>(() => {
  return factory.create();
});

const hardToMakeResource = resourcePool.acquire();
hardToMakeResource.id = 13;

// use hardToMakeResource and then release it

resourcePool.release(hardToMakeResource);

// aquire another resource from the pool which will be the same object as before

const anotherHardToMakeResource = resourcePool.acquire();

console.log(anotherHardToMakeResource.id); // 13 - the same object as before

// use anotherHardToMakeResource and then release it

resourcePool.release(anotherHardToMakeResource);

/**
 * Object pool pattern
 *
 * Pros:
 * - You can control the number of objects created.
 * - You can reuse objects that are no longer in use.
 * - You can reduce the number of expensive operations (such as initializing objects).
 * - You can reduce the amount of memory that is used to store objects.
 * - Garbage collection does not take place as often.
 *
 * Cons:
 * - You need to implement the logic for the object pool.
 * - You need to implement the logic for the object factory.
 */
