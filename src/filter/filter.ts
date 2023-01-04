import { TermFilterType } from './types';

export class Filter {
  constructor(
    protected filterType: string,
  ) {}

  public getFilterType() {
    return this.filterType;
  }
}

export class TermFilter extends Filter {
  constructor(
    protected property: string,
    protected conditions,
    filterType: string,
    protected termFilterType: TermFilterType = 'property'
  ) {
    super(filterType);
  }

  public transform(value) {
    return value;
  }

  public getProperty() {
    return this.property;
  }

  public getFilterType() {
    return this.filterType;
  }

  public getTermFilterType() {
    return this.termFilterType;
  }

  public toJson() {
    const conds = Array.isArray(this.conditions) ? this.conditions : [this.conditions];
    return conds.map(cond => (
      cond.toJson().map((value) => ({
        [this.termFilterType]: this.property,
        [this.filterType]: this.transform(value)
      })
    )));
  }
}