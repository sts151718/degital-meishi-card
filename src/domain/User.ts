import { htmlParse } from "@/lib/parser/htmlParse";
import type { Skill } from "./Skill";
import type { ReactNode } from "react";

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

export type UserDescription = {
  title: string;
  detail: ReactNode;
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
      data.githubId !== null && data.githubId !== ""
        ? `https://github.com/${data.githubId}`
        : null;
    const qiitaUrl =
      data.qiitaId !== null && data.qiitaId !== ""
        ? `https://qiita.com/${data.qiitaId}`
        : null;
    const xUrl =
      data.xId !== null && data.xId !== "" ? `https://x.com/${data.xId}` : null;

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

  public makeProfileDescriptions = (): Array<UserDescription> => {
    return [
      {
        title: "自己紹介",
        detail: htmlParse(this?.description ?? ""),
      },
      { title: "好きな技術", detail: this?.skill.name ?? "" },
    ];
  };
}
