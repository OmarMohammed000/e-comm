import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Grid2 } from "@mui/material";
import ProfileSideBar from "./ProfileSideBar";
import axios from "axios";
import apiLink from "../../data/ApiLink";

function OrderHistory() {
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError]=useState(null);
  useEffect(()=>{
    const getOrders=async()=>{
      try {
        const response = await axios.get(`${apiLink}/orders`,{
          withCredentials: true,  
        })
        console.log(response.data)
        setOrders(response.data)
      } catch (error) {
        
      }finally{
        setLoading(false)
      }
    }
    getOrders()
  },[])
  console.log(orders)
  return (
    <>
      <NavBar></NavBar>
      <Grid2 container spacing={2} sx={{ height: "60vh" }}>
        <ProfileSideBar></ProfileSideBar>

        <Grid2 size={{ xs: 12, md: 10, lg: 9, mt: 5 }}>  </Grid2>
      </Grid2>
      <Footer></Footer>
    </>
  );
}

export default OrderHistory;
