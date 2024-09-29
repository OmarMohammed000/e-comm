import React from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileSideBar from "./ProfileSideBar";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { Box, Container, Grid2, Paper, Typography } from "@mui/material";

function ProfileDetails() {
  const { user } = useAuth();
  console.log(user)
  return (
    <>
      <NavBar></NavBar>
      <Grid2 container spacing={2} sx={{ height:"60vh" }}>
        <ProfileSideBar></ProfileSideBar>
        
          <Grid2 size={{xs:12,md:10, lg:9  , mt:5}}>
            <Paper
              sx={{
                padding: 5,mt:5
              }}
            >
              <Typography variant="h5" gutterBottom>
                Account Details
              </Typography>
              <Box>
                <Typography variant="body1">
                  <strong>Full Name:</strong> {user.user_name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {user.phone ||'No phone number has been put'}
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong> {user.address ||'No Address has been put'}
                </Typography>
              </Box>
            </Paper>
          </Grid2>
        
      </Grid2>

      <Footer></Footer>
    </>
  );
}

export default ProfileDetails;
