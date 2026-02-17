import { Container } from '@chakra-ui/react';
import type { FC } from 'react';
import { Outlet } from 'react-router';

export const MainLayout: FC = () => {
  return (
    <Container pt="12" mx="auto" px="8" pb="8" maxW="500px">
      <Outlet />
    </Container>
  );
};
