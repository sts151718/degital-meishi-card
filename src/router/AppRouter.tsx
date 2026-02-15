import { MainLayout } from '@/components/layouts/MainLayout';
import { CardDetail } from '@/components/pages/CardDetail';
import { CardRegister } from '@/components/pages/CardRegister';
import { Page404 } from '@/components/pages/Page404';
import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

export const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/cards/:userId" element={<CardDetail />} />
          <Route path="/cards/register" element={<CardRegister />}></Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
