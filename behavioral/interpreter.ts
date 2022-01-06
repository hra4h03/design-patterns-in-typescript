namespace Interpreter {
  interface Expression<T> {
    interpret(context: string): T;
  }

  class PlusExpression implements Expression<number> {
    constructor(
      private expression1: Expression<number>,
      private expression2: Expression<number>
    ) {}

    interpret(context: string): number {
      return (
        this.expression1.interpret(context) +
        this.expression2.interpret(context)
      );
    }
  }

  class MinusExpression implements Expression<number> {
    constructor(
      private expression1: Expression<number>,
      private expression2: Expression<number>
    ) {}

    interpret(context: string): number {
      return (
        this.expression1.interpret(context) -
        this.expression2.interpret(context)
      );
    }
  }

  class NumberExpression implements Expression<number> {
    constructor(private number: number) {}

    interpret(context: string): number {
      return this.number;
    }
  }

  const expression$8 = new NumberExpression(8);
  const expression$7 = new NumberExpression(7);

  const minusExpression = new MinusExpression(expression$8, expression$7);

  const expression$9 = new NumberExpression(9);

  const plusExpression = new PlusExpression(minusExpression, expression$9);

  console.log(plusExpression.interpret(""));

  function interpret(expression: string) {
    const stack: Expression<number>[] = [];
    const words = expression.split(" ");

    for (const word of words) {
      switch (word) {
        case "+":
          stack.push(new PlusExpression(stack.pop()!, stack.pop()!));
          break;
        case "-":
          stack.push(new PlusExpression(stack.pop()!, stack.pop()!));
          break;
        default:
          stack.push(new NumberExpression(parseInt(word)));
          break;
      }
    }
  }
}
