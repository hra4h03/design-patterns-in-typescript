type FamilyClass = {
  0: "lower-class";
  1: "working-class";
  2: "middle-class";
  3: "upper-class";
};

interface Family {
  membersCount: number;
  currentClass: keyof FamilyClass;
}

interface PriorityStrategy {
  order(data: Family[]): Family[];
}

class DonationFoundation {
  private donationPerFamily = 10;

  constructor(
    private donationFund: number,
    private priorityStrategy: PriorityStrategy
  ) {}

  private donate(family: Family) {
    this.donationFund -= this.donationPerFamily;
    family.currentClass += 1;
  }

  help(families: Family[]) {
    const orderedFamilies = this.priorityStrategy.order(families);

    orderedFamilies.forEach(this.donate);
  }

  changeStrategy(priorityStrategy: PriorityStrategy) {
    this.priorityStrategy = priorityStrategy;
  }
}

// in object oriented programming
class FamilyMembersPriority implements PriorityStrategy {
  order(families: Family[]) {
    return families.sort((firstFamily, secondFamily) => {
      const firstFamilyImportance = firstFamily.membersCount;
      const secondFamilyImportance = secondFamily.membersCount;

      return firstFamilyImportance - secondFamilyImportance;
    });
  }
}

class FamilyClassPriority implements PriorityStrategy {
  order(families: Family[]) {
    return families.sort((firstFamily, secondFamily) => {
      const firstFamilyImportance = firstFamily.currentClass;
      const secondFamilyImportance = secondFamily.currentClass;

      return firstFamilyImportance - secondFamilyImportance;
    });
  }
}

// in functional programming
type OrderStrategy = (families: Family[]) => Family[];

const orderByMembers: OrderStrategy = (families: Family[]) => {
  return families.sort((a, b) => a.membersCount - b.membersCount);
};

const orderByClass: OrderStrategy = (families: Family[]) => {
  return families.sort((a, b) => a.currentClass - b.currentClass);
};

// how client will use
const families: Family[] = [
  {
    currentClass: 0,
    membersCount: 4,
  },
  {
    currentClass: 3,
    membersCount: 2,
  },
];

// now we can change the priority strategy at runtime.
const aurora = new DonationFoundation(1000, new FamilyClassPriority());

aurora.help(families);

aurora.changeStrategy(new FamilyMembersPriority());

aurora.help(families);

/**
 * Strategy method pros
 *
 *  * open/close principle
 *  * composition over inheritance
 *  * isolate implementations and details
 *
 * Strategy method cons
 *
 *  * overhead for not changing strategies (for example if we have only one strategy)
 *
 */
