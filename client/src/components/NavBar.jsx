import React from "react";
import {
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Button,
  ThemeProvider,
  CssBaseline,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import theme from "../data/Theme";
import NavItems from "./NavItems";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";

function NavBar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static" component="nav" sx={{ pr: 3, pl: 3 }}>
        <Toolbar>
          <IconButton onClick={() => navigate("/")}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dy7r2qdi0/image/upload/v1726483726/finalIcon_efo3yr.png"
              alt="icon"
              sx={{ width: 100, height: 75 }}
            />
          </IconButton>
          <NavItems></NavItems>
          <Search></Search>
          <Button
            color="secondry"
            size="large"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <Badge badgeContent={totalQuantity} color="error">
            <ShoppingCartIcon></ShoppingCartIcon>
            </Badge>
          </Button>
          {user ? (
            <Button
              color="secondry"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <AccountCircleIcon></AccountCircleIcon>
            </Button>
          ) : (
            <Button
              color="error"
              variant="outlined"
              size="large"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default NavBar;
