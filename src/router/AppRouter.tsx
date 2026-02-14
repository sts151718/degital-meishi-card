import { MainLayout } from "@/components/layouts/MainLayout";
import { CardDetail } from "@/components/pages/CardDetail";
import { Page404 } from "@/components/pages/Page404";
import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

export const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/cards/:userId" element={<CardDetail />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
