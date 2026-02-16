import type { IDescriptionItem } from '@/components/molecules/DescriptionList';
import type { User } from '../class/User';
import { htmlParse } from '@/lib/parser/htmlParse';

export const makeProfileDescriptions = (user: User | null): Array<IDescriptionItem> => {
  return [
    {
      title: '自己紹介',
      detail: htmlParse(user?.description ?? ''),
    },
    { title: '好きな技術', detail: user?.skill.name ?? '' },
  ];
};
