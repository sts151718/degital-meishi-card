import { User, type IUser, type UserCreate } from "@/domain/User";
import { supabase } from "../setup";
import { Skill } from "@/domain/Skill";

export const selectUserById = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*, user_skill(skills(id, name))")
    .eq("id", userId)
    .limit(1)
    .single();

  if (error) {
    throw new Error(`${error.details}: ${error.message}`);
  }

  const skillData = data.user_skill[0].skills;
  const skill = new Skill(skillData.id, skillData.name);

  const userData: UserCreate = {
    id: data.id,
    name: data.name,
    description: data.description,
    githubId: data.github_id,
    qiitaId: data.qiita_id,
    xId: data.x_id,
    skill,
  };
  const user = User.create(userData);

  return user;
};
