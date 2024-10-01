import { Box, Container, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSideBar from "./AdminSideBar";
import axios from "axios";
import apiLink from "../../data/ApiLink";
function Admin() {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  useEffect(() => {
    const getDashboard = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("No access token found");

        const response = await axios.get(`${apiLink}/admin/dashboard`,{
          headers:{
            Authorization: `Bearer ${accessToken}`,
          }
        });
        setDashboard(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error.data);
        setError("Error fetiching dashboard" + error);
      } finally {
        setLoading(false);
      }
    };
    getDashboard();
  }, []);
 
  if (error) return <div> {error}</div>;

  return (
    <Grid2 container>
      <AdminSideBar></AdminSideBar>
      <Grid2 size={{xs:4,md:9,lg:10}}>
        <Box>
          <Typography variant="h4" textAlign={"center"} sx={{ mt: 5 }}>
            Admin dashboard
          </Typography>
          <Typography variant="h3" textAlign={"center"} sx={{ mt: 5 }}>
            Welcome {user.user_name}
          </Typography>
        </Box>
        {loading ? (
          <div>Loading</div>
        ) : (
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 5,
              flexDirection: {
                xs: "column", 
                sm: "column",  
                md: "row",     
              },
            }}
          >
            <Typography variant="h5" sx={{ m: 2,}}>
              Number Of Products : {dashboard.productCount}
            </Typography>
            <Typography variant="h5" sx={{ m: 2 }}>
              Number Of Active Users : {dashboard.userCount}
            </Typography>
            <Typography variant="h5" sx={{ m: 2 }}>
              Number Of categories : {dashboard.categoryCount}
            </Typography>
          </Container>
        )}
      </Grid2>
    </Grid2>
  );
}

export default Admin;
