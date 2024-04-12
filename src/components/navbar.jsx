import React, { useContext } from "react";
import { Context } from "../store/appContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const onLogoutClick = () => {
    actions.logOut();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "64px" }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Érre Technology - Challenge ‘24
          </Typography>
          <Button color="inherit" onClick={() => onLogoutClick()}>
            Logout
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
