import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";

const DrawerLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default DrawerLayout;
