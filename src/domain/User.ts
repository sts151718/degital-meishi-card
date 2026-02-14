import type { Skill } from "./Skill";

export interface IUser {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly githubUrl: string | null;
  readonly qiitaUrl: string | null;
  readonly xUrl: string | null;
  readonly skill: Skill;
}

export type UserCreate = {
  id: string;
  name: string;
  description: string;
  githubId: string | null;
  qiitaId: string | null;
  xId: string | null;
  skill: Skill;
};

export class User implements IUser {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly githubUrl: string | null;
  public readonly qiitaUrl: string | null;
  public readonly xUrl: string | null;
  public readonly skill: Skill;

  private constructor(
    id: string,
    name: string,
    description: string,
    githubUrl: string | null,
    qiitaUrl: string | null,
    xUrl: string | null,
    skill: Skill,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.githubUrl = githubUrl;
    this.qiitaUrl = qiitaUrl;
    this.xUrl = xUrl;
    this.skill = skill;
  }

  public static create(data: UserCreate) {
    const githubUrl =
      data.githubId !== null ? `https://github.com/${data.githubId}` : null;
    const qiitaUrl =
      data.qiitaId !== null ? `https://qiita.com/${data.qiitaId}` : null;
    const xUrl = data.xId !== null ? `https://x.com/${data.xId}` : null;

    return new User(
      data.id,
      data.name,
      data.description,
      githubUrl,
      qiitaUrl,
      xUrl,
      data.skill,
    );
  }
}
