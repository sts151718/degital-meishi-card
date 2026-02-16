import type { Skill } from '@/domain/class/Skill';
import { selectAllSkills } from '@/lib/supabase/databases/skill';
import { useState } from 'react';

export const useSkillAll = () => {
  const [skills, setSkills] = useState<Array<Skill>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllSkills = async () => {
    setIsLoading(true);

    const skills = await selectAllSkills();
    setSkills(skills);
    setIsLoading(false);
  };

  return { skills, isLoading, fetchAllSkills };
};
