import readLineSync from "readline-sync";

namespace Adapter {
  interface BusinessLogicAdapter {
    run(): void;
  }

  class WebAdapter implements BusinessLogicAdapter {
    constructor(private businessLogic: BusinessLogic) {}

    run() {
      const input = document.getElementById(
        "form_number_input"
      ) as HTMLInputElement;
      const number = input.valueAsNumber;

      const result = this.businessLogic.getNthFibNumber(number);

      const resultNode = document.getElementById("result_node")!;
      resultNode.innerText = `${number}th fibonacci number is ${result}`;
    }
  }

  class CommandLineAdapter implements BusinessLogicAdapter {
    constructor(private businessLogic: BusinessLogic) {}

    run() {
      const number = readLineSync.questionInt(
        "Input a number, I'll calculate n-th fibonacci number. \n"
      );

      const result = this.businessLogic.getNthFibNumber(number);
      console.log(`${number}th fibonacci number is ${result}`);
    }
  }

  class BusinessLogic {
    getNthFibNumber(n: number) {
      const fibNumber = [1, 1];
      if (n < fibNumber.length) return fibNumber[n];

      for (let i = 2; i <= n; i++) {
        fibNumber[i] = fibNumber[i - 1] + fibNumber[i - 2];
      }

      return fibNumber[n];
    }
  }
}

/**
 * Adapter Design Pattern provides a service which makes other classes to work together,
 * which in other case was not possible. In this example two classes are
 * web and business logic,
 * command line and business logic
 * For business logic to work with web or command line, we create adapters for both web and command line.
 *
 *   * Pros
 * * Single responsibility principle, business class is responsible only the actual logic,
 *    not the representation mechanism used.
 * * Open/Closed principle, software can introduce as many representations as it wants, not just limited by one or two.
 *
 *   * Cons
 * * Adapter pattern increases the code complexity by introducing new interfaces and classes. Sometimes it is better to
 *    add or modify the existing class to fit the new requirements.
 */
