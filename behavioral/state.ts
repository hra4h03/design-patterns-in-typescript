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
