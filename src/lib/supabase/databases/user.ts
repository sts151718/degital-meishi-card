import { User, type IUserCreate } from '@/domain/class/User';
import { supabase } from '../setup';
import { Skill } from '@/domain/class/Skill';
import type { UserInput } from '@/domain/class/UserInput';
import type { Database } from '../database';

export const selectUserById = async (userId: string): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .select('*, user_skill(skills(id, name))')
    .eq('id', userId)
    .limit(1)
    .single();

  if (error) {
    throw new Error(`${error.details}: ${error.message}`);
  }

  const skillData = data.user_skill[0].skills;
  const skill = new Skill(skillData.id, skillData.name);

  const userData: IUserCreate = {
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

export const insertUser = async (input: UserInput) => {
  const insertData = {
    _id: input.id,
    _name: input.name,
    _description: input.description,
    _skill_id: Number(input.skillId),
  } as Database['public']['Functions']['insert_user_and_userskill']['Args'];

  if (input.githubId) {
    insertData['_github_id'] = input.githubId;
  }
  if (input.qiitaId) {
    insertData['_qiita_id'] = input.qiitaId;
  }
  if (input.xId) {
    insertData['_x_id'] = input.xId;
  }
  const { error } = await supabase.rpc('insert_user_and_userskill', insertData);

  if (error) {
    throw new Error(`${error.details}: ${error.message}`);
  }
};
