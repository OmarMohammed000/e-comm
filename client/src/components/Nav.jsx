import React, { useState } from "react";
import {
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Typography,
  ThemeProvider,
  CssBaseline,
  Menu,
  MenuItem,
} from "@mui/material";
import finalIcon from "../assets/finalIcon.png";
import theme from "../data/Theme";

function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Handle clicking to open the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle clicking to close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Toggle menu open/close
  const handleMenuToggle = (event) => {
    if (anchorEl) {
      handleMenuClose();
    } else {
      handleMenuOpen(event);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            <Box
              component="img"
              src={finalIcon}
              alt="icon"
              sx={{ width: 100, height: 75 }}
            />
          </IconButton>
          
         
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default NavBar;
