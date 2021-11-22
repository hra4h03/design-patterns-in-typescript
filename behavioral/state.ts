interface PhoneState {
  clickPower(): void;
  clickHome(): void;
}

class OpenedPhoneState implements PhoneState {
  constructor(private readonly phone: IPhone) {}

  clickHome() {
    this.phone.openMenu();
  }

  clickPower() {
    this.phone.turnOff();
    this.phone.changeState(new LockedPhoneState(this.phone));
  }
}

class LockedPhoneState implements PhoneState {
  constructor(private readonly phone: IPhone) {}

  clickHome() {
    this.phone.turnOn();
    this.phone.openMenu();
    this.phone.changeState(new OpenedPhoneState(this.phone));
  }

  clickPower() {
    this.phone.turnOn();
    this.phone.changeState(new OpenedPhoneState(this.phone));
  }
}

class IPhone {
  state: PhoneState = new LockedPhoneState(this);

  changeState(state: PhoneState) {
    this.state = state;
  }

  clickHome() {
    this.state.clickHome();
  }

  clickPower() {
    this.state.clickPower();
  }

  // phone methods not implemented for simplicity
  clickVolumeUp() {}
  clickVolumeDown() {}
  openMenu() {}
  turnOff() {}
  turnOn() {}
}

const iPhone8 = new IPhone();

iPhone8.clickHome(); // this will call locked state method which will change phone state to open and call openMenu.

iPhone8.clickPower(); // this will call opened state method which will turn it off.

iPhone8.clickVolumeUp();
iPhone8.clickVolumeUp();
iPhone8.clickVolumeDown();

/**
 * State Pattern helps to separate conditional logic into separate class.
 * State Pattern supposed that application has finite state, and each
 *  of them can have different implementation depending to the state.
 *
 * State Pattern Pros
 *  * It replaces the ugly if/switch conditions with polymorphism.
 *  * Clear understandable logic representation.
 *  * Open/Close principle, we can introduce new state for application without changing the client code.
 *  * Single Responsibility Principle. The client code should not
 *     know about what action need to do for each state condition.
 *
 * State Pattern Cons
 *  * Overkill for small amount of states or for states that rarely change.
 *
 */
