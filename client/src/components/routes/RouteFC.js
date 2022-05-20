import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import Profile from "../../pages/Profile";
import Register from "../../pages/Register";
import DrawerLayout from "../Layouts/DrawerLayout";

function RouteFC() {

  return (
    <div className="App">
      <Routes>
        <Route element={<DrawerLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default RouteFC;
