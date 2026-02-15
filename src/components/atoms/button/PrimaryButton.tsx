import { Button, type ButtonProps } from '@chakra-ui/react';
import { memo, type FC, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  buttonProps?: ButtonProps;
};

export const PrimaryButton: FC<Props> = memo((props) => {
  const { children, buttonProps = {} } = props;

  return (
    <Button fontSize="md" colorPalette="blue" {...buttonProps}>
      {children}
    </Button>
  );
});
