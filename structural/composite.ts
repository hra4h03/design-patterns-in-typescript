interface IProduct {
  price: number;
  name: string;
  model: string;
  weight: number;
}

interface IOrder {
  open(): IProduct[];
  calculatePrice(): number;
  getWeight(): number;
}

// CompositeNode
class OrderBox implements IOrder {
  private readonly orders = new Set<IOrder>();

  add(...orders: IOrder[]) {
    orders.forEach((order) => this.orders.add(order));
  }

  remove(...order: IOrder[]) {
    order.forEach((order) => this.orders.delete(order));
  }

  open() {
    const products: IProduct[] = [];

    this.orders.forEach((order) => {
      products.concat(order.open());
    });

    return products;
  }

  calculatePrice() {
    let totalPrice = 0;

    this.orders.forEach((order) => {
      totalPrice += order.calculatePrice();
    });

    return totalPrice;
  }

  getWeight() {
    let totalWeight = 0;

    this.orders.forEach((order) => {
      totalWeight += order.getWeight();
    });

    return totalWeight;
  }
}

// LeafNode
class OrderedProduct implements IOrder {
  constructor(private readonly product: IProduct) {}

  open() {
    return [this.product];
  }

  calculatePrice() {
    return this.product.price;
  }

  getWeight() {
    return this.product.weight;
  }
}

// dum products data
const hammer: IProduct = {
  weight: 100,
  name: "hammer",
  model: "base",
  price: 20,
};

const headphones: IProduct = {
  weight: 5,
  name: "headphones",
  model: "AirPods-1",
  price: 300,
};

const charger: IProduct = {
  weight: 10,
  name: "charger",
  model: "Type-C",
  price: 50,
};

// utility function
function makeOrder(...orderedProducts: IOrder[]) {
  const orderBox = new OrderBox();
  orderBox.add(...orderedProducts);

  return orderBox;
}

const amazonDeliveryBox = new OrderBox();

const jamesOrders = makeOrder(new OrderedProduct(hammer));
const jonesOrders = makeOrder(
  new OrderedProduct(charger),
  new OrderedProduct(headphones)
);

const arthurFatherOrders = makeOrder(new OrderedProduct(hammer));
const arthurMotherOrders = makeOrder(new OrderedProduct(charger));
const arthurOrders = makeOrder(
  new OrderedProduct(charger),
  new OrderedProduct(headphones)
);

const arthurFamilyOrders = makeOrder(
  arthurFatherOrders,
  arthurMotherOrders,
  arthurOrders
);
// the list can go infinite

// notice we threated orderBox with orderedProduct the same way.
amazonDeliveryBox.add(jamesOrders, jonesOrders, arthurFamilyOrders);

console.log(amazonDeliveryBox.calculatePrice()); // all delivery product's price: 790
console.log(amazonDeliveryBox.getWeight()); // total weight: 240

/**
 * Composite Pattern provides uniform interface for two classes
 *  1. for simple leaf node classes.
 *  2. for complex container classes.
 * So the client can work with that interface without knowing the object is simple leaf or complex container.
 *
 * When to use?
 *  Use Composite Pattern when working with tree like structure.
 *
 * Composite Pattern Pros
 *  * Open/Closed principle: the leaf and container implement the same interface.
 *
 * Composite Pattern Cons
 *  * Sometimes it is hard to provide common interface for both leaf nodes and container nodes,
 *      so you need to overgeneralize the interface to be able to work with both nodes.
 */
