import type { FC, ReactNode } from 'react';
import { MainCard } from '../molecules/MainCard';
import { Flex, Heading } from '@chakra-ui/react';
import { LinkIcon } from '../atoms/LinkIcon';
import { DescriptionList, type IDescriptionItem } from '../molecules/DescriptionList';
import type { ISnsUrl } from '@/domain/class/User';
import { FaSquareGithub, FaXTwitter } from 'react-icons/fa6';
import { SiQiita } from 'react-icons/si';

type Props = {
  name: string;
  snsUrls: Partial<ISnsUrl>;
  profiles: Array<IDescriptionItem>;
};

type SnsIcon = {
  label: string;
  node: ReactNode;
};

export const CardProfile: FC<Props> = (props) => {
  const { name, snsUrls, profiles } = props;
  const snsIcons: Record<keyof ISnsUrl, SnsIcon> = {
    githubUrl: { label: 'Githubアイコン', node: <FaSquareGithub /> },
    qiitaUrl: { label: 'Qiitaアイコン', node: <SiQiita /> },
    xUrl: { label: 'Xアイコン', node: <FaXTwitter /> },
  };

  return (
    <MainCard
      header={<Heading as="h1">{name}</Heading>}
      footer={
        <Flex align="center" justifyContent="space-between" w="full">
          {(Object.keys(snsUrls) as Array<keyof ISnsUrl>).map((key) => (
            <LinkIcon
              key={key}
              href={snsUrls[key] ?? ''}
              isBlank
              isReferrer
              LinkProps={{ 'aria-label': snsIcons[key].label }}
              iconProps={{ size: '2xl' }}
            >
              {snsIcons[key].node}
            </LinkIcon>
          ))}
        </Flex>
      }
      data-testid="card-profile"
    >
      <DescriptionList contents={profiles}></DescriptionList>
    </MainCard>
  );
};
