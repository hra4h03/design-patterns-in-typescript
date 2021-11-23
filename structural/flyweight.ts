type Shape = {};
interface Coords {
  x: number;
  y: number;
}

interface IParticle {
  shape: string;
  speed: number;
  vector: string;
  coords: Coords;
  color: string;
}

const colors = ["red", "green", "blue", "white", "black"];
const shapes = ["bullet", "circle", "rect", "oval", "player"];

function getRandom<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

namespace WithoutFlyweight {
  class Particle {
    constructor(
      // extrinsic state
      private readonly shape: string,
      private readonly color: string,

      // intrinsic state
      public readonly speed: number,
      public readonly vector: string,
      public readonly coords: Coords
    ) {}

    move(x: number, y: number) {
      this.coords.x += x;
      this.coords.y += y;
    }
  }

  // creating lots of Particle will cause memory leaks and application crushes.
  function createBullet() {
    for (let i = 0; i < 10000000; i++) {
      new Particle(getRandom(shapes), getRandom(colors), 20, "", {
        x: 5,
        y: 5,
      });
    }
  }

  console.time(`particle`);
  createBullet();
  console.timeEnd(`particle`); // creating 10.000.000 objects took ~10s
}

namespace WithFlyweight {
  class Particle {
    constructor(public readonly shape: string, public readonly color: string) {}

    move(coords: Coords, x: number, y: number) {
      coords.x += x;
      coords.y += y;
    }
  }

  class ParticleFlyweightFactory {
    cache: Record<string, Particle> = {};

    private getKey(particle: IParticle) {
      return `${particle.shape}-${particle.color}`;
    }

    createParticle(particle: IParticle) {
      if (this.getKey(particle) in this.cache) {
        return this.cache[this.getKey(particle)];
      }

      const newFlyweight = new Particle(particle.shape, particle.color);
      this.cache[this.getKey(particle)] = newFlyweight;

      return newFlyweight;
    }
  }

  const particleFactory = new ParticleFlyweightFactory();

  function createBullet() {
    for (let i = 0; i < 10000000; i++) {
      particleFactory.createParticle({
        coords: { x: 5, y: 5 },
        shape: getRandom(shapes),
        vector: "",
        speed: 20,
        color: getRandom(colors),
      });
    }
  }

  console.time(`particleFlyweight`);
  createBullet();
  console.timeEnd(`particleFlyweight`); // with flyweight it takes 2x less than without flyweight. ~5s
}
