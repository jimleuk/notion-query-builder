export class Condition<T> {
  constructor(
    private property: string,
    private params: T | T[],
  ) {}

  toJson() {
    const values = Array.isArray(this.params) ? this.params : [this.params];
    return values.map(value => ({ [this.property]: value }));
  }
}