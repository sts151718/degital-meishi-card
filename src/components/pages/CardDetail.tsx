import { useEffect, type FC } from "react";
import { useParams } from "react-router";
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { FaSquareGithub, FaXTwitter } from "react-icons/fa6";
import { SiQiita } from "react-icons/si";
import { LinkIcon } from "../atoms/LinkIcon";
import { MainCard } from "../molecules/MainCard";
import { DescriptionList } from "../molecules/DescriptionList";
import { useSelectUser } from "@/hooks/useSelectUser";
import type { UserDescription } from "@/domain/User";

export const CardDetail: FC = () => {
  const { userId } = useParams();

  const { selectedUser, isLoading, fetchUser } = useSelectUser();

  useEffect(() => {
    (async () => {
      try {
        await fetchUser(userId ?? "");
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const profiles: Array<UserDescription> =
    selectedUser?.makeProfileDescriptions() ?? [];

  if (isLoading) {
    return (
      <MainCard>
        <Spinner />
      </MainCard>
    );
  }

  return (
    <MainCard
      header={<Heading>{selectedUser?.name}</Heading>}
      footer={
        <Flex align="center" justifyContent="space-between" w="full">
          {selectedUser?.githubUrl && (
            <LinkIcon
              href={selectedUser.githubUrl}
              iconProps={{ size: "2xl" }}
              isBlank
              isReferrer
            >
              <FaSquareGithub />
            </LinkIcon>
          )}
          {selectedUser?.qiitaUrl && (
            <LinkIcon
              href={selectedUser.qiitaUrl}
              iconProps={{ size: "2xl" }}
              isBlank
              isReferrer
            >
              <SiQiita />
            </LinkIcon>
          )}
          {selectedUser?.xUrl && (
            <LinkIcon
              href={selectedUser.xUrl}
              iconProps={{ size: "2xl" }}
              isBlank
              isReferrer
            >
              <FaXTwitter />
            </LinkIcon>
          )}
        </Flex>
      }
    >
      <DescriptionList contents={profiles}></DescriptionList>
    </MainCard>
  );
};
