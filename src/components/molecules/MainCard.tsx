import { Card } from "@chakra-ui/react";
import { memo, type FC, type ReactNode } from "react";

type Props = {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export const MainCard: FC<Props> = memo((props) => {
  const { header = null, children, footer = null } = props;

  return (
    <Card.Root borderRadius="md">
      <Card.Header>{header}</Card.Header>
      <Card.Body py={4}>{children}</Card.Body>
      <Card.Footer w="full">{footer}</Card.Footer>
    </Card.Root>
  );
});
