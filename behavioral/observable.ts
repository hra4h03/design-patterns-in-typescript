import "reflect-metadata";

// defining observable & observer with interfaces
interface IObservable {
  register(observer: IObserver): void;
  unregister(observer: IObserver): void;
  notify(): void;
}

interface IObserver {
  update(): void;
}

// defining observable & observer with abstract classes
abstract class Observer<T extends IObservable> {
  constructor(protected observable: T) {
    this.observable.register(this);
  }

  destructor() {
    this.observable.unregister(this);
  }

  update() {
    console.log("observable updated");
  }
}

abstract class Observable {
  protected observers: IObserver[] = [];

  register(observer: IObserver) {
    this.observers.push(observer);
  }

  unregister(removingObserver: IObserver) {
    this.observers.filter((observer) => observer !== removingObserver);
  }

  notify() {
    this.observers.forEach((observer) => observer.update());
  }
}

type Technology = { name: string; stars: number };

class FrameworkTrends extends Observable {
  trends: Technology[] = [];

  addTrend(trend: Technology) {
    this.trends.push(trend);
    this.notify();
  }
}

class Programmer extends Observer<FrameworkTrends> {
  constructor(
    public type: string,
    observable: FrameworkTrends,
    public techStack: Technology[] = []
  ) {
    super(observable);
  }

  learn(technology: Technology) {
    this.techStack.push(technology);
  }

  override update() {
    const newTrend = this.observable.trends[this.observable.trends.length - 1];

    if (!this.techStack.includes(newTrend)) {
      this.learn(newTrend);
    }
  }
}

const frontendFrameworks = new FrameworkTrends();

const frontendDeveloper = new Programmer("front-end", frontendFrameworks);

frontendFrameworks.addTrend({ name: "ReactJs", stars: 150 });
frontendFrameworks.addTrend({ name: "VueJs", stars: 174 });
frontendFrameworks.addTrend({ name: "Svelte", stars: 54 });

console.log(frontendDeveloper.techStack); // will output 3 technologies:
