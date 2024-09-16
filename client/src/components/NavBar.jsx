import React from "react";
import {
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Button,
  ThemeProvider,
  CssBaseline,

} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import finalIcon from "../assets/finalIcon.png";
import theme from "../data/Theme";
import NavItems from "./NavItems";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  
  

  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <AppBar position="static" component="nav" sx={{pr:3,pl:3}}>
        <Toolbar>
          <IconButton
            onClick={() => navigate("/")}
          >
            <Box
              component="img"
              src={finalIcon}
              alt="icon"
              sx={{ width: 100, height: 75 }}
              
            />
          </IconButton>
          <NavItems >
          </NavItems>
          <Search></Search>
          <Button color="secondry" size="medium"><ShoppingCartIcon></ShoppingCartIcon></Button>
          <Button color="error" variant="outlined" size="medium">Login</Button>
        </Toolbar>
      </AppBar>
     
    </ThemeProvider>
  );
}

export default NavBar;
