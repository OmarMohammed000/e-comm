import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Container,  Typography, Box, Paper, Grid2 } from "@mui/material";
import ProfileSideBar from "./ProfileSideBar";
import axios from "axios";
import apiLink from "../../data/ApiLink";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`${apiLink}/orders`, {
          withCredentials: true,
        });
       
        setOrders(response.data);
      } catch (error) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  return (
    <>
      <NavBar />
      <Grid2 container spacing={2} >
        <ProfileSideBar />

        <Grid2 size={{ xs: 12, md: 10, lg: 9, mt: 5 }}>
          <Container>
            {loading ? (
              <Typography variant="h5" textAlign={"center"} color="black">
                Loading...
              </Typography>
            ) : error ? (
              <Typography variant="h5" textAlign={"center"} color="red">
                {error}
              </Typography>
            ) : orders.length === 0 ? (
              <Typography variant="h3" textAlign={"center"} color="black" sx={{ height: "60vh" }}>
                There are no orders
              </Typography>
            ) : (
              orders.map((order) => (
                <Box key={order.id} mb={2} mt={2} component={Paper} p={2} elevation={3} borderRadius={4}>
                  <Typography variant="h6" color="primary">
                    Order ID: {order.id}
                  </Typography>
                  <Typography variant="subtitle1" >
                    Order Date: {new Date(order.time_of_order).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle1" >
                    Shipping Address: {order.to_address}, {order.to_city}
                  </Typography>

                  <Box mt={2}>
                    <Typography variant="h6" color="primary">
                      Items in Order:
                    </Typography>
                    {order.OrderItems.map((item) => (
                      <Box key={item.id} mt={1} p={1} >
                        <Typography variant="body1">
                          <strong>Product:</strong> {item.Product.title}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Quantity:</strong> {item.quantity}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))
            )}
          </Container>
        </Grid2>
      </Grid2>
      <Footer />
    </>
  );
}

export default OrderHistory;
