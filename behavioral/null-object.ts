namespace NullObject {
  type Coords = { x: number; y: number };

  interface MovingStrategy {
    onRight(coords: Coords): void;
    onLeft(coords: Coords): void;
    onUp(coords: Coords): void;
    onDown(coords: Coords): void;
  }

  class SuperHeroMoves implements MovingStrategy {
    onDown(coords: Coords) {
      coords.y -= 10;
    }

    onLeft(coords: Coords) {
      coords.x -= 10;
    }

    onRight(coords: Coords) {
      coords.x += 10;
    }

    onUp(coords: Coords) {
      coords.y += 10;
    }
  }

  class HumanMoves implements MovingStrategy {
    onDown(coords: Coords) {
      coords.y -= 2;
    }

    onLeft(coords: Coords) {
      coords.x -= 2;
    }

    onRight(coords: Coords) {
      coords.x += 2;
    }

    onUp(coords: Coords) {
      coords.y += 2;
    }
  }

  // null object
  class NoMoves implements MovingStrategy {
    onDown(coords: Coords) {}
    onLeft(coords: Coords) {}
    onRight(coords: Coords) {}
    onUp(coords: Coords) {}
  }

  class Player {
    constructor(public movingStrategy: MovingStrategy) {}

    changeMovingStrategy(movingStrategy: MovingStrategy) {
      this.movingStrategy = movingStrategy;
    }
  }

  function freezePlayer(player: Player) {
    player.changeMovingStrategy(new NoMoves());
  }
}

/**
 * Null object pattern provides object which is doing nothing.
 * The advantage of this pattern is that we communicate with null object the same way as the non-null objects,
 * instead of writing if checks, if the given object is null or not.
 *
 * Pros
 *  * gives uniform interface for acting with null values
 */
