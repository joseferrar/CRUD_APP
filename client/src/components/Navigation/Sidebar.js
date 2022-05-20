import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WorkIcon from "@mui/icons-material/Work";
import { theme } from "../../theme/default";

const useStyles = makeStyles({
  active: {
    background: "#000",
    color: theme.palette.success.main,
    "&:hover": {
      background: "#000",
      color: theme.palette.success.main,
    },
  },
  text: {
    color: theme.palette.success.main,
    fontSize: 16,

  },
  icon: {
    color: theme.palette.success.main,
    fontWeight: "bold"
  },
  activeIcon: {
    color: "#000",
    fontSize: 16,
  },
});

const userRoutes = [
  {
    id: 1,
    path: "/",
    name: "Login",
  },
  {
    id: 2,
    path: "/register",
    name: "Register",
  },
  {
    id: 3,
    path: "/profile",
    name: "Profile",
  },
];

const Sidebar = (props) => {
  const { setMobileOpen } = props;
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <Stack
        direction="column"
        spacing={1}
        marginTop={2}
        marginLeft={5}
        marginBottom={3}
      >
        <Typography variant="body1" fontWeight="bold" color="white">
          gh
        </Typography>
        <Typography fontFamily={"Source Sans Pro"} color="white">
          fgh
        </Typography>
      </Stack>

      <List>
        {userRoutes.map((item) => (
          <div key={item.id}>
            <ListItem
              style={{ marginTop: 14 }}
              button
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              {/* <ListItemText primary={item.name} color={theme.palette.default.main} /> */}
              <Typography
                variant="body1"
                className={
                  location.pathname === item.path
                    ? classes.text
                    : classes.activeIcon
                }
              >
                {item.name}
              </Typography>
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
};

Sidebar.propTypes = {
  setMobileOpen: PropTypes.func,
};

export default Sidebar;
