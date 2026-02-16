import { useEffect, type FC } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Center, Spinner, Stack } from '@chakra-ui/react';
import { MainCard } from '../molecules/MainCard';
import type { IDescriptionItem } from '../molecules/DescriptionList';
import { useSelectUser } from '@/hooks/useSelectUser';
import { makeProfileDescriptions } from '@/domain/view/makeUserProfiles';
import { SecondaryButton } from '../atoms/button/SecondaryButton';
import { CardProfile } from '../organisms/CardProfile';

export const CardDetail: FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

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

  const enabledSnsUrls = selectedUser?.pickEnabledSnsUrls() ?? {};

  const onNavigateTop = () => navigate('/');

  if (isLoading) {
    return (
      <Stack spaceY={6}>
        <MainCard>
          <Center>
            <Spinner />
          </Center>
        </MainCard>
        <SecondaryButton onClick={onNavigateTop}>戻る</SecondaryButton>
      </Stack>
    );
  }

  return (
    <Stack spaceY={6}>
      <CardProfile name={selectedUser?.name ?? ''} snsUrls={enabledSnsUrls} profiles={profiles} />
      <SecondaryButton onClick={onNavigateTop}>戻る</SecondaryButton>
    </Stack>
  );
};
