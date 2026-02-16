import { supabase } from '../setup';
import { Skill } from '@/domain/class/Skill';

export const selectAllSkills = async (): Promise<Array<Skill>> => {
  const { data, error } = await supabase.from('skills').select('*, user_skill(skills(id, name))');

  if (error) {
    throw new Error(`${error.details}: ${error.message}`);
  }

  const skills = data.map((item) => {
    return new Skill(item.id, item.name);
  });

  return skills;
};
