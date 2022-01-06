namespace ProxyPattern {
  function createRange(range: { start: number; end: number }) {
    return new Proxy(range, {
      has(target, property: PropertyKey) {
        return (
          target.start <= Number(property) && target.end >= Number(property)
        );
      },
      get(target, property: PropertyKey, receiver) {
        const value = target.start + Number(property);
        if (value > target.end) throw new Error("Out of index");

        return value;
      },
      ownKeys(target) {
        const keys = new Array(target.end - target.start + 1).fill("");
        return Reflect.ownKeys(keys);
      },
      getOwnPropertyDescriptor(target, prop) {
        return {
          enumerable: !isNaN(parseInt(prop as string)),
          configurable: true,
        };
      },
    }) as unknown as number[];
  }

  const range = createRange({ start: 5, end: 10 });

  console.log("range ", range);

  for (const key in range) {
    console.log(`range[${key}] `, range[key]);
  }

  console.log("5 in range ", 5 in range);
}
