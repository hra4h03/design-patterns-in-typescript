type FurnitureType = "modern" | "normal" | "old";

// bunch of related classes
class ModernChair {}

class NormalChair {}

class OldChair {}

class ModernSofa {}

class NormalSofa {}

class OldSofa {}

class ModernTable {}

class NormalTable {}

class OldTable {}

class FurnitureAbstractFactory {
  // realizations may vary but the meaning of abstract factory
  // is to organize the creation of related classes
  constructor(public readonly furnitureType: FurnitureType) {}

  createSofa() {
    if (this.furnitureType === "modern") return new ModernSofa();
    if (this.furnitureType === "old") return new OldSofa();
    return new NormalSofa();
  }

  createChair() {
    if (this.furnitureType === "modern") return new ModernChair();
    if (this.furnitureType === "old") return new OldChair();
    return new NormalChair();
  }

  createTable() {
    if (this.furnitureType === "modern") return new ModernTable();
    if (this.furnitureType === "old") return new OldTable();
    return new NormalTable();
  }
}

// We are guaranteed that the classes we create are compatible together.
// We do not create objects like old table with modern chair and normal sofa.
const modernFurnitureFactory = new FurnitureAbstractFactory("modern");

const chair = modernFurnitureFactory.createChair();
const table = modernFurnitureFactory.createTable();
const sofa = modernFurnitureFactory.createSofa();
