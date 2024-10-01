import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import {
  Box,
  Button,
  Container,
  Grid2,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeItemFromCart,
  clearCart,
  loadCartFromStorage,
} from "../../context/cartSlice";
import { updateItemQuantity } from "../../context/cartSlice";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartStatus = useSelector((state) => state.cart.status);
  const cartError = useSelector((state) => state.cart.error);
  const { user } = useAuth();
  const [toAddress, setAddress] = useState(user.address || "");
  const [toCity, setCity] = useState("");
  const [errors, setErrors] = useState({ address: "", city: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart from the backend
    dispatch(loadCartFromStorage());
    if (cartStatus === "idle") {
      dispatch(fetchCart());
    }
  }, [cartStatus, dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };
  const handleIncreaseQuantity = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch(
      updateItemQuantity({ productId: item.Product.id, quantity: newQuantity })
    );
  };

  const handleDecreaseQuantity = (item) => {
    const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
    dispatch(
      updateItemQuantity({ productId: item.Product.id, quantity: newQuantity })
    );
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // handling order submisson
  const handleOrderNow = async () => {
    setErrors({ address: "", city: "" }); // Clear previous errors
    let hasError = false;

    // Validate address
    if (!toAddress.trim()) {
      setErrors((prev) => ({ ...prev, address: "Address is required." }));
      hasError = true;
    }

    // Validate city
    if (!toCity.trim()) {
      setErrors((prev) => ({ ...prev, city: "City is required." }));
      hasError = true;
    }

    // If there are validation errors, stop here
    if (hasError) return;

    // Prepare order data
    const orderData = {
      to_address: toAddress,
      to_city: toCity,
      items: cartItems.map((item) => ({
        product_id: item.Product.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await axios.post("/orders", orderData);
      console.log("Order successful:", response.data);
      handleClearCart();
      navigate("/order/successful");
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error as needed
    }
  };

  if (cartStatus === "loading") {
    return <div>Loading cart...</div>;
  }

  if (cartStatus === "failed") {
    return <div>Error: {cartError}</div>;
  }
  return (
    <>
      <NavBar></NavBar>
      <Grid2 container spacing={2}>
        {cartItems.length === 0 ? (
          <Grid2
            size={12}
            textAlign={"center"}
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
              flexDirection: "column",
              height: "50vh",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Cart is Empty
            </Typography>
            <AddShoppingCartIcon
              sx={{ fontSize: 100, color: "primary.main", mb: 2 }}
            ></AddShoppingCartIcon>
            <Button
              variant="contained"
              color="primary"
              onClick={()=>{
                navigate('/')
              }}
              sx={{ mt: 2 }}
            >
              Start Shopping
            </Button>
          </Grid2>
        ) : (
          <>
            <Grid2 size={8} sx={{ height: "50vh" }}>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {cartItems &&
                  cartItems.map((item) => (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                      }}
                      key={item.id}
                    >
                      <Box
                        component="img"
                        src={
                          item.Product?.Images?.[1]?.image_location ||
                          item.Product?.Images?.[0]?.image_location ||
                          "default-image-path.jpg"
                        }
                        alt={item?.Product?.title || " "}
                        sx={{ width: 200, height: 267, m: 2 }}
                      />
                      <Typography variant="h5">{item.Product.title}</Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 2,
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => handleDecreaseQuantity(item)}
                          aria-label="decrease"
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ mx: 2, color: "black" }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => handleIncreaseQuantity(item)}
                          aria-label="increase"
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>

                      <Box textAlign={"center"}>
                        <Typography variant="h6" color="error">
                          {item.Product.price}
                        </Typography>
                        <IconButton
                          onClick={() => handleRemoveItem(item.Product.id)}
                        >
                          <DeleteIcon size="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
              </Container>
            </Grid2>
            <Grid2 size={4}>
              <Paper
                sx={{
                  mx: 2,
                  my: 2,
                  bgcolor: "primary.main",
                  color: "secondary.main",
                  textAlign: "center",
                  p: 2,
                }}
                variant="elevation"
              >
                <Typography variant="h4" textAlign="center">
                  Order Summary
                </Typography>
                <Typography
                  variant="body2"
                  textAlign={"start"}
                  sx={{ mt: 1, mb: 1 }}
                >
                  Product Price: {totalPrice} EGP{" "}
                </Typography>
                <Typography
                  variant="body2"
                  textAlign={"start"}
                  sx={{ mt: 1, mb: 1 }}
                >
                  {" "}
                  Shipping price: 0
                </Typography>
                <Typography variant="h5" textAlign={"start"}>
                  {" "}
                  Total Price:{totalPrice} EGP
                </Typography>
                <Box sx={{ mt: 2, bgcolor: "#eeeeee", p: 2 }}>
                  {/* Address Input */}
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    value={toAddress}
                    onChange={(e) => setAddress(e.target.value)}
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                    sx={{ mt: 2 }}
                  />

                  {/* City Input */}
                  <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    value={toCity}
                    onChange={(e) => setCity(e.target.value)}
                    error={Boolean(errors.city)}
                    helperText={errors.city}
                    sx={{ mt: 2 }}
                  />
                </Box>
                <Button
                  color="error"
                  variant="outlined"
                  size="large"
                  sx={{ m: 2 }}
                  onClick={handleOrderNow}
                >
                  Order Now
                </Button>
              </Paper>
            </Grid2>
          </>
        )}
      </Grid2>

      <Footer></Footer>
    </>
  );
}

export default Cart;
