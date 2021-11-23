interface Device {
  getVolume(): number;
  setVolume(percent: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
  turnOn(): void;
  turnOff(): void;
  isOn(): boolean;
}

class Tv implements Device {
  private volume: number = 5;
  private channel: number = 0;
  private on: boolean = false;

  getVolume() {
    return this.volume;
  }

  setVolume(percentage: number) {
    this.volume = percentage;
  }

  getChannel() {
    return this.channel;
  }

  setChannel(channel: number) {
    this.channel = channel;
  }

  isOn() {
    return this.on;
  }

  turnOn() {
    this.on = true;
  }

  turnOff() {
    this.on = false;
  }
}

class RemoteControl {
  constructor(private readonly device: Device) {}

  togglePower() {
    if (this.device.isOn()) return this.device.turnOff();
    return this.device.turnOn();
  }

  channelUp() {
    this.device.setChannel(this.device.getChannel() + 1);
  }

  channelDown() {
    this.device.setChannel(this.device.getChannel() - 1);
  }

  volumeUp() {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  volumeDown() {
    this.device.setVolume(this.device.getVolume() - 10);
  }
}

const samsungTv = new Tv();

const remote = new RemoteControl(samsungTv);

remote.channelDown();
remote.channelUp();

remote.volumeUp();
