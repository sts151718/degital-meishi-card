import { useEffect, type FC, type ReactNode } from 'react';
import { useParams } from 'react-router';
import { Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import { FaSquareGithub, FaXTwitter } from 'react-icons/fa6';
import { SiQiita } from 'react-icons/si';
import { LinkIcon } from '../atoms/LinkIcon';
import { MainCard } from '../molecules/MainCard';
import { DescriptionList, type IDescriptionItem } from '../molecules/DescriptionList';
import { useSelectUser } from '@/hooks/useSelectUser';
import type { ISnsUrl } from '@/domain/class/User';
import { makeProfileDescriptions } from '@/domain/view/makeUserProfiles';

export const CardDetail: FC = () => {
  const { userId } = useParams();

  const { selectedUser, isLoading, fetchUser } = useSelectUser();

  useEffect(() => {
    (async () => {
      try {
        await fetchUser(userId ?? '');
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const profiles: Array<IDescriptionItem> = makeProfileDescriptions(selectedUser);

  const enabledSnsList = selectedUser?.pickEnabledSnsList() ?? [];
  const snsIcons: Record<keyof ISnsUrl, ReactNode> = {
    githubUrl: <FaSquareGithub />,
    qiitaUrl: <SiQiita />,
    xUrl: <FaXTwitter />,
  };

  if (isLoading) {
    return (
      <MainCard>
        <Center>
          <Spinner />
        </Center>
      </MainCard>
    );
  }

  return (
    <MainCard
      header={<Heading>{selectedUser?.name}</Heading>}
      footer={
        <Flex align="center" justifyContent="space-between" w="full">
          {enabledSnsList.map((sns) => (
            <LinkIcon key={sns} href={selectedUser?.[sns] ?? ''} iconProps={{ size: '2xl' }} isBlank isReferrer>
              {snsIcons[sns]}
            </LinkIcon>
          ))}
        </Flex>
      }
    >
      <DescriptionList contents={profiles}></DescriptionList>
    </MainCard>
  );
};
