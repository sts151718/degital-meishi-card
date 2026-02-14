import type { ReactNode } from "react";
import type { User } from "../class/User";
import { htmlParse } from "@/lib/parser/htmlParse";

export interface IUserDescription {
  readonly title: string;
  readonly detail: ReactNode;
}

export const makeProfileDescriptions = (
  user: User | null,
): Array<IUserDescription> => {
  return [
    {
      title: "自己紹介",
      detail: htmlParse(user?.description ?? ""),
    },
    { title: "好きな技術", detail: user?.skill.name ?? "" },
  ];
};
