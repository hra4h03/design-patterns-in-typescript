// Builder pattern helps to construct object step by step,
// hiding the details of how it is constructed.
// Builder is great if client wants to construct different representations of some object

// simple SQL Select query builder
class SQLQueryBuilder {
  constructor(
    readonly table: string,
    protected expression: string = `SELECT * FROM ${table} WHERE`
  ) {}

  where(condition: string, variables: Record<string, any> = {}) {
    const params = condition.match(/:\w+/g); // take :<key> out

    if (params) {
      params.forEach((param) => {
        const key = param.substr(1); // remove <:> from param

        condition = condition.replaceAll(param, variables[key]);
      });
    }

    this.expression += ` ${condition}`;
    return this;
  }

  andWhere(condition: string, variables: Record<string, any> = {}) {
    this.where(`AND ${condition}`, variables);
    return this;
  }

  orWhere(condition: string, variables: Record<string, any> = {}) {
    this.where(`OR ${condition}`, variables);
    return this;
  }

  orderBy(column: string, direction: string = "ASC") {
    const condition = ` ORDER BY ${this.table}.${column} ${direction}`;
    this.expression += condition;

    return this;
  }

  build() {
    return `${this.expression};`;
  }
}

const builder = new SQLQueryBuilder("users");

const userQuery = builder
  .where("users.id = :id", { id: 1 })
  .andWhere("users.name LIKE :term", { term: "SMT" })
  .orderBy("createdAt", "DESC")
  .build();

console.log(userQuery);
