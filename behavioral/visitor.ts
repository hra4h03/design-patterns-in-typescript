namespace Visitor {
  type Coords = { x: number; y: number };

  interface Visitor<T = void> {
    forRect(rect: Rect): T;
    forCircle(circle: Circle): T;
    forTriangle(triangle: Triangle): T;
  }

  interface VisitingElement {
    accept<T>(visitor: Visitor<T>): T;
  }

  class Rect implements VisitingElement {
    constructor(
      public coords: Coords,
      public height: number,
      public width: number
    ) {}

    accept<T>(visitor: Visitor<T>) {
      return visitor.forRect(this);
    }
  }

  class Circle implements VisitingElement {
    constructor(public coords: Coords, public radius: number) {}

    accept<T>(visitor: Visitor<T>) {
      return visitor.forCircle(this);
    }
  }

  class Triangle implements VisitingElement {
    constructor(
      public vertex1: Coords,
      public vertex2: Coords,
      public vertex3: Coords
    ) {}

    accept<T>(visitor: Visitor<T>) {
      return visitor.forTriangle(this) as T;
    }
  }

  class AreaVisitor implements Visitor {
    forRect(rect: Rect) {
      return rect.width * rect.height;
    }

    forCircle(circle: Circle) {
      return Math.PI * Math.pow(circle.radius, 2);
    }

    forTriangle(triangle: Triangle) {
      const side1 = this.euclidDistance(triangle.vertex1, triangle.vertex2);
      const side2 = this.euclidDistance(triangle.vertex2, triangle.vertex3);
      const side3 = this.euclidDistance(triangle.vertex3, triangle.vertex1);

      // heron's formula
      const perimeter = (side1 + side2 + side3) / 2;

      const area = Math.sqrt(
        perimeter *
          (perimeter - side1) *
          (perimeter - side2) *
          (perimeter - side3)
      );

      return area;
    }

    private euclidDistance(startVertex: Coords, endVertex: Coords) {
      const distance = Math.sqrt(
        Math.pow(endVertex.x - startVertex.x, 2) +
          Math.pow(endVertex.y - startVertex.y, 2)
      );

      return distance;
    }
  }

  class DrawerVisitor implements Visitor {
    context: CanvasRenderingContext2D;

    constructor() {
      const canvas = document.createElement("canvas");
      this.context = canvas.getContext("2d")!;
    }

    forRect(rect: Rect) {
      this.context.fillStyle = "#000";
      this.context.rect(rect.coords.x, rect.coords.y, rect.width, rect.height);
      this.context.fill();
    }

    forCircle(circle: Circle) {
      this.context.fillStyle = "#000";
      this.context.arc(
        circle.coords.x,
        circle.coords.y,
        circle.radius,
        0,
        Math.PI * 2
      );
      this.context.fill();
    }

    forTriangle(triangle: Triangle) {
      this.context.strokeStyle = "red";

      this.context.beginPath();
      this.context.moveTo(triangle.vertex1.x, triangle.vertex1.y);
      this.context.lineTo(triangle.vertex2.x, triangle.vertex2.y);
      this.context.lineTo(triangle.vertex3.x, triangle.vertex3.y);
      this.context.lineTo(triangle.vertex1.x, triangle.vertex1.y);
      this.context.closePath();
      this.context.stroke();
    }
  }

  function getTotalArea(figures: VisitingElement[]) {
    const areaVisitor = new AreaVisitor();

    const totalArea = figures.reduce((sum, figure) => {
      return sum + figure.accept(areaVisitor);
    }, 0);

    return totalArea;
  }

  function draw(figures: VisitingElement[]) {
    const drawer = new DrawerVisitor();

    figures.forEach((figure) => figure.accept(drawer));
  }
}

/**
 * Visitor design pattern
 *
 * The actual algorithm is outside from the class, inside visitor,
 * which implements the logic for different classes independently
 *
 * Visitor pattern pros
 *  * Provides uniform way of working with class from outside.
 *  * Open/Close principle, creating a new visitor will not force us to change class code.
 *  * Single responsibility principle, class should not care about what the visitor does,
 *      so it did not keep the logic inside.
 *  * Handy for collecting information about the visitor specific method calls.
 *
 * Visitor pattern cons
 *  * Each time new class is created in application, we need to add visitor implementation for it.
 *  * Visitor lacks accessing class private methods and properties.
 *
 */
