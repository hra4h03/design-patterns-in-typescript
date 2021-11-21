type Class<T> = { new (...args: any[]): T };

abstract class Beverage {
  private price = 0;

  cost() {
    return this.price;
  }

  getDescription() {
    return "Beverage";
  }
}

// with decorator factory
const WithSugarFactory = (amount = 1) => {
  const sugarCost = 3;

  return (constructor: Class<Beverage>) => {
    return class extends constructor {
      cost() {
        return super.cost() + sugarCost * amount;
      }
    };
  };
};

const WithEspressoFactory = (amount = 1) => {
  const espressoCost = 5;

  return (constructor: Class<Beverage>) => {
    return class extends constructor {
      cost() {
        return super.cost() + espressoCost * amount; // actual price plus cost of sugar
      }
    };
  };
};

// only with decorator function
const withSugar = (constructor: Class<Beverage>) => {
  const sugarCost = 3;

  return class extends constructor {
    cost() {
      return super.cost() + sugarCost; // actual price plus cost of sugar
    }
  };
};

const withEspresso = (constructor: Class<Beverage>) => {
  const espressoCost = 5;

  return class extends constructor {
    cost() {
      return super.cost() + espressoCost; // actual price plus cost of sugar
    }
  };
};

// how to use with typescript decorators
@withEspresso
@withSugar
class Tea extends Beverage {
  cost() {
    return 5;
  }
}

class Coffee extends Beverage {
  cost() {
    return 8;
  }
}

// how to use without typescript decorators
const coffeeWithSugarAndEspresso = new (withEspresso(withSugar(Coffee)))();
const teaWithSugarAndEspresso = new Tea();

console.log(coffeeWithSugarAndEspresso.cost()); // cost will be: 16
console.log(teaWithSugarAndEspresso.cost()); // cost will be: 13

// or with decorator factory
@WithSugarFactory(2)
class Milk extends Beverage {
  cost() {
    return 6;
  }
}

const milkWithTwoSpoonSugar = new Milk();
console.log(milkWithTwoSpoonSugar.cost()); // cost will be: 12
