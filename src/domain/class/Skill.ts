export interface IUser {
  readonly id: number;
  readonly name: string;
}

export class Skill implements IUser {
  public readonly id: number;
  public readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
