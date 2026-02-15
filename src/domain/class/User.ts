import type { Skill } from './Skill';

export interface ISnsUrl {
  readonly githubUrl: string | null;
  readonly qiitaUrl: string | null;
  readonly xUrl: string | null;
}

export interface IUserProfile {
  readonly name: string;
  readonly description: string;
  readonly skill: Skill;
}

export interface IUser extends ISnsUrl, IUserProfile {
  readonly id: string;
}

export interface IUserCreate extends IUserProfile {
  readonly id: string;
  readonly githubId: string | null;
  readonly qiitaId: string | null;
  readonly xId: string | null;
}

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
    skill: Skill
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.githubUrl = githubUrl;
    this.qiitaUrl = qiitaUrl;
    this.xUrl = xUrl;
    this.skill = skill;
  }

  public static create(data: IUserCreate) {
    const githubUrl = data.githubId !== null ? `https://github.com/${data.githubId}` : null;
    const qiitaUrl = data.qiitaId !== null ? `https://qiita.com/${data.qiitaId}` : null;
    const xUrl = data.xId !== null ? `https://x.com/${data.xId}` : null;

    return new User(data.id, data.name, data.description, githubUrl, qiitaUrl, xUrl, data.skill);
  }

  public pickEnabledSnsList = (): Array<keyof ISnsUrl> => {
    const snsUrls = {
      githubUrl: this.githubUrl,
      qiitaUrl: this.qiitaUrl,
      xUrl: this.xUrl,
    };

    const enabledSnsList: Array<keyof ISnsUrl> = [];
    (Object.keys(snsUrls) as Array<keyof ISnsUrl>).forEach((key) => {
      if (snsUrls[key]) {
        enabledSnsList.push(key);
      }
    });

    return enabledSnsList;
  };
}
