// src/components/layout/Layout.tsx
import React from "react";
import Herder from "../herder/herder";
import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";

const Layout: React.FC = () => {
  return (
    <>
      <Herder />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
