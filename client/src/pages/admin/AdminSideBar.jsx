import { Box, Divider, Grid2, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function AdminSideBar() {
  const navigate = useNavigate();
  const textStyles = {
    color: "white",
    fontSize: {
      xs: "0.75rem", 
      sm: "0.875rem", 
      md: "1rem",     
    },
  };
  return (
    <Grid2 size={{xs:4,md:3,lg:2}} sx={{ bgcolor: "black", height: "100vh", position: "sticky", 
      top: 0, }}>
      <IconButton onClick={() => navigate("/admin")}>
        <Box
          component="img"
          src="https://res.cloudinary.com/dy7r2qdi0/image/upload/v1726483726/finalIcon_efo3yr.png"
          alt="icon"
          sx={{
            width: {
              xs: 50, 
              sm: 75, 
              md: 100, 
            },
            height: {
              xs: 38,  
              sm: 56, 
              md: 75,  
            },}}
        />
      </IconButton>
      <Divider  sx={{ borderColor: "white" }}/>
      <List >
        
          <ListItem disablePadding sx={{color:"white"}}>
            <ListItemButton sx={{":hover":{bgcolor:"grey"}}} onClick={()=>{
              navigate("/admin/products")
            }}>
              <ListItemText primaryTypographyProps={textStyles} primary={"Products"} /> 
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{":hover":{bgcolor:"grey"}}} onClick={()=>{
              navigate("/admin/users")
            }} >
              <ListItemText primaryTypographyProps={textStyles} primary={"Users"}  />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{":hover":{bgcolor:"grey"}}} onClick={()=>{
              navigate("/admin/tags")
            }}>
              <ListItemText  primaryTypographyProps={textStyles} primary={"Tags"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{":hover":{bgcolor:"grey"}}} onClick={()=>{
              navigate("/admin/subcategories")
            }}>
              <ListItemText primaryTypographyProps={textStyles}primary={"Subcategory"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{":hover":{bgcolor:"grey"}}} onClick={()=>{
              navigate("/admin/categories")
            }}> 
              <ListItemText primaryTypographyProps={textStyles} primary={"Category"} />
            </ListItemButton>
          </ListItem>
        
      </List>

    </Grid2>
  );
}

export default AdminSideBar;
