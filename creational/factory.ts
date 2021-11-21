type CardDetails = any;
type PaymentType = "stripe" | "paypal" | "card";

interface IPayment {
  pay(cardDetails: CardDetails): number;
}

class PaypalPayment implements IPayment {
  pay(cardDetails: CardDetails) {
    // some paypal specific logic...
    return 0;
  }
}

class StripePayment implements IPayment {
  pay(cardDetails: CardDetails) {
    // some stripe specific logic...
    return 0;
  }
}

class BankCardPayment implements IPayment {
  pay(cardDetails: CardDetails) {
    // some bank card specific logic...
    return 0;
  }
}
// we have different payment methods implementing the same interface.
// at some point in our program, we want to process a payment.

class PaymentFactory {
  // we can take how much params we need to decide which object should be
  create(paymentType: PaymentType) {
    if (paymentType === "stripe") return new StripePayment();
    if (paymentType === "paypal") return new PaypalPayment();
    if (paymentType === "card") return new BankCardPayment();

    throw new Error("not processable payment type");
  }
}

function processPayment() {
  // in reality this would not be hardcoded here.
  const userInput: PaymentType = "card";
  const userInfo: CardDetails = {};

  const customerPaymentFactory = new PaymentFactory();
  const payment = customerPaymentFactory.create(userInput);

  payment.pay(userInfo);
}
