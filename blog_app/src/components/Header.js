import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";

const Header = () => {
  const { token, username, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" color="primary" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            Home
          </Link>
        </Typography>

        {token ? (
          <>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              Welcome, {username}
            </Typography>
            <Button
              color="inherit"
              component={RouterLink}
              to="/create"
              sx={{ mr: 1 }}
            >
              Create Post
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
              sx={{ mr: 1 }}
            >
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
