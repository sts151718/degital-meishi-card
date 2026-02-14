import { Container } from "@chakra-ui/react";
import type { FC } from "react";
import { Outlet } from "react-router";

export const MainLayout: FC = () => {
  return (
    <Container mt="16" px="8">
      <Outlet />
    </Container>
  );
};
