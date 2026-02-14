import { User } from "@/domain/User";
import { selectUserById } from "@/lib/supabase/databases/user";
import { useEffect, useState, type FC } from "react";
import { useParams } from "react-router";
import { Box, Link, Spinner, Text } from "@chakra-ui/react";

export const CardDetail: FC = () => {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      if (userId === undefined) {
        throw new Error("Empty User Id");
      }

      const user = await selectUserById(userId);
      setCurrentUser(user);
      setIsLoading(false);
    };

    try {
      fetchUser();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box as="dl" fontSize="md">
          <Text as="dt">名前:</Text>
          <Text as="dd">{currentUser?.name}</Text>
          <Text as="dt">自己紹介:</Text>
          <Text as="dd">{currentUser?.description}</Text>
          <Text as="dt">スキル:</Text>
          <Text as="dd">{currentUser?.skill.name}</Text>
          <Text as="dt">
            <Link href={currentUser?.githubUrl ?? ""}>Github</Link>
          </Text>
          <Text as="dd"></Text>
          <Text as="dt">
            <Link href={currentUser?.qiitaUrl ?? ""}>Qiita</Link>
          </Text>
          <Text as="dd"></Text>
          <Text as="dt">
            <Link href={currentUser?.xUrl ?? ""}>X</Link>
          </Text>
          <Text as="dd"></Text>
        </Box>
      )}
    </>
  );
};
