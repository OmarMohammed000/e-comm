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
import theme from "../data/Theme";
import NavItems from "./NavItems";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  

  

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
              src="https://res.cloudinary.com/dy7r2qdi0/image/upload/v1726483726/finalIcon_efo3yr.png"
              alt="icon"
              sx={{ width: 100, height: 75 }}
              
            />
          </IconButton>
          <NavItems >
          </NavItems>
          <Search></Search>
          <Button color="secondry" size="medium"><ShoppingCartIcon></ShoppingCartIcon></Button>
          {user?(<div>{user.email}</div>):<Button color="error" variant="outlined" size="medium" onClick={()=>{
            navigate("/login")
          }}>Login</Button>}
        </Toolbar>
      </AppBar>
     
    </ThemeProvider>
  );
}

export default NavBar;
