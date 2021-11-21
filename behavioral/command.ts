interface ICommand {
  execute(): void;
  undo(): void;
}

class CopyCommand implements ICommand {
  constructor(
    private readonly editor: Editor,
    private snapshot = { clipboard: editor.clipboard }
  ) {}

  execute() {
    this.snapshot.clipboard = this.editor.clipboard;

    const [startIndex, endIndex] = this.editor.getSelection();
    this.editor.clipboard = this.editor.text.substring(startIndex, endIndex);
  }

  undo() {
    // not implemented.
  }
}

class PasteCommand implements ICommand {
  constructor(
    private readonly editor: Editor,
    private snapshot = {
      clipboard: editor.clipboard,
      cursorIndex: editor.cursorIndex,
    }
  ) {}

  execute() {
    this.snapshot.clipboard = this.editor.clipboard;
    this.snapshot.cursorIndex = this.editor.cursorIndex;

    this.editor.text =
      this.editor.text.slice(0, this.snapshot.cursorIndex) +
      this.editor.clipboard +
      this.editor.text.slice(this.snapshot.cursorIndex);
  }

  undo() {
    this.editor.text =
      this.editor.text.slice(0, this.snapshot.cursorIndex) +
      this.editor.text.slice(
        this.snapshot.cursorIndex + this.snapshot.clipboard.length
      );
  }
}

class Editor {
  constructor(
    public text: string,
    public history: ICommand[] = [],
    public clipboard: string = ""
  ) {}

  get cursorIndex() {
    return Math.floor(Math.random() * this.text.length);
  }

  getSelection() {
    // const text = document.getSelection();

    // random slice of text
    const firstIndex = Math.floor(Math.random() * this.text.length);
    const secondIndex = Math.floor(Math.random() * this.text.length);

    const startIndex = Math.min(firstIndex, secondIndex);
    const endIndex = Math.max(firstIndex, secondIndex);

    return [startIndex, endIndex];
  }

  executeCommands(...commands: ICommand[]) {
    commands.forEach((command) => {
      command.execute();
      this.history.push(command);
    });

    return this;
  }

  undo(count = 1) {
    const undoCommands = this.history.splice(
      this.history.length - count,
      count
    );

    undoCommands.reverse().forEach((command) => {
      command.undo();
    });
  }
}

/**
 * Command pattern pros
 *
 *  * Single responsibility: Command pattern decouples the request from invoker (ex. UI buttons) and receiver (ex. Editor class).
 *  * Open/Close principle: Introducing new Commands will not cause any change in application.
 *  * Easy implementation of undo/redo functionality
 *  * Composition of Commands into bigger Command
 *
 * Command pattern cons
 *
 *  * new layer of abstraction, which makes application more complex.
 */

const editor = new Editor(`
  Lorem ipsum dolor sit amet, 
  obcaecati nostrum iure.
`);

const copy = new CopyCommand(editor);
const paste = new PasteCommand(editor);

// This commands, in reality will be called from UI ( invoker ).
editor.executeCommands(copy);

console.log(editor.clipboard);

editor.executeCommands(paste);

console.log(editor.text);
console.log(editor.history.length); // will output 2:

editor.undo();

editor.executeCommands(copy, paste, copy, paste);
editor.undo(4);

console.log(editor.text);
console.log(editor.history.length); // will output 1:
