import React from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import { theme } from "../../theme/default";

export default function MainLayout({ children }) {
  return (
    <div style={{ flexGrow: 1}}>
      <Header />
      <div style={{ width: "100%", padding: theme.spacing(3), marginTop: theme.spacing(8) }}>
        {children}
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.element,
};