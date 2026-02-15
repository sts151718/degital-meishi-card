import { Box, Heading, Stack } from '@chakra-ui/react';
import { memo, type FC, type ReactNode } from 'react';

export type IDescriptionItem = {
  readonly title: string;
  readonly detail: ReactNode;
};

type Props = {
  contents: Array<IDescriptionItem>;
  spaceY?: string;
};

export const DescriptionList: FC<Props> = memo((props) => {
  const { contents, spaceY = '6' } = props;

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
});
