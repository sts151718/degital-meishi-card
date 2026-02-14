import type { IUserDescription } from "@/domain/class/User";
import { Box, Heading, Stack } from "@chakra-ui/react";
import type { FC } from "react";

type Props = {
  contents: Array<IUserDescription>;
  spaceY?: string;
};

export const DescriptionList: FC<Props> = (props) => {
  const { contents, spaceY = "6" } = props;

  return (
    <Stack as="dl" p={0} spaceY={spaceY}>
      {contents.map(({ title, detail }) => (
        <div key={title}>
          <Heading as="dt" size="sm">
            {title}
          </Heading>
          <Box as="dd">{detail}</Box>
        </div>
      ))}
    </Stack>
  );
};
