namespace Mediator {
  class Input {
    constructor(public name: string, public value?: string) {}

    onChange(newValue: string) {
      this.value = newValue;
    }

    render() {
      const inputElement = null; // this can be actual html DOM object
      return inputElement;
    }
  }

  class Checkbox {
    constructor(public name: string, public value?: boolean) {}

    onToggle() {
      this.value = !this.value;
    }

    render() {
      const checkboxElement = null; // this can be actual html DOM object
      return checkboxElement;
    }
  }

  class Dialog {
    public input: Input;
    public checkbox: Checkbox;
    constructor() {
      this.checkbox = new Checkbox("Are you over 18?");
      this.input = new Input("Provide application details.");
    }

    render() {
      if (this.checkbox.value === false) {
        return { checkbox: this.checkbox };
      }

      return { input: this.input };
    }
  }
}
