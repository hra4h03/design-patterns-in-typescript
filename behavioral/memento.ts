const createBoard = () => {
  // just create 8x8 matrix
  return new Array(8).fill(null).map(() => new Array(8).fill(0));
};

namespace Memento {
  type Coords = {
    x: number;
    y: number;
  };

  interface ChessGameState {
    board: number[][];
    currentPlayer: Player;
  }

  enum Player {
    WHITE = "WHITE",
    BLACK = "BLACK",
  }

  class Chess {
    private board: number[][] = createBoard();
    private currentPlayer = Player.WHITE;

    move(startCoords: Coords, endCoords: Coords) {
      // move imitation without any logic
      const figure = this.board[startCoords.x][startCoords.y];
      this.board[endCoords.x][endCoords.y] = figure;

      this.board[startCoords.x][startCoords.y] = 0;

      if (this.currentPlayer === Player.WHITE)
        this.currentPlayer = Player.BLACK;

      if (this.currentPlayer === Player.BLACK)
        this.currentPlayer = Player.WHITE;
    }

    save(name: string): ChessGameMemento {
      return new ChessGameMemento(name, {
        board: this.board,
        currentPlayer: this.currentPlayer,
      });
    }

    restore(memento: ChessGameMemento) {
      this.board = memento.state.board;
      this.currentPlayer = memento.state.currentPlayer;
    }
  }

  class ChessGameMemento {
    public createdAt: Date;
    constructor(public name: string, public state: ChessGameState) {
      this.createdAt = new Date();
    }
  }

  const game = new Chess();

  const e2 = { x: 1, y: 5 };
  const e4 = { x: 3, y: 5 };

  game.move(e2, e4);

  const snapshot = game.save("For later");

  // later in application...
  game.restore(snapshot);
}
