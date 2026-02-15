import { Button, type ButtonProps } from '@chakra-ui/react';
import { memo, type FC, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

export const SecondaryButton: FC<Props & ButtonProps> = memo((props) => {
  const { children, onClick, ...rest } = props;

  return (
    <Button fontSize="md" colorPalette="teal" onClick={onClick} {...rest}>
      {children}
    </Button>
  );
});
