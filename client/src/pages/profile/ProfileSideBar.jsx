import { Box, Button, Grid2, Link, Paper, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProfileSideBar() {
  const navigate = useNavigate()
  const {logout}=useAuth()
  const handleLogout = async () => {
    try {
      await logout();  // Call the logout function from Auth context
      navigate("/login");  // Redirect to login page
    } catch (error) {
      console.error("Logout failed", error);  // Handle logout error
    }
  };
  return (
    <>
     {/* Sidebar */}
     <Grid2 size={{xs:12,md:2 ,lg:2}}>
      <Paper sx={{ padding: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 2 ,backgroundColor:"primary.main",borderRadius:0 ,}}>
        <Typography variant="h6" gutterBottom>
          Profile 
        </Typography>
        {/* Sidebar Items */}
        <Box sx={{padding:1 , display:"flex",flexDirection:"column"}}>
          <Link variant="body1" underline='hover' color='secondary.main' sx={{mb:1}} href="/Profile">Profile Settings</Link>
          <Link  variant="body1" underline='hover' color='secondary.main' sx={{mb:1}} href="/profile/orderHistory">Order History</Link>
         
          <Button
              color="error"
              variant="outlined"
              size="large"
              onClick={handleLogout}
            >
              Logout
            </Button>
        </Box>
      </Paper>
    </Grid2>
    </>
  )
}

export default ProfileSideBar