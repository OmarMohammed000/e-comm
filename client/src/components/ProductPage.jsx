import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiLink from "../data/ApiLink";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../context/cartSlice';

function ProductPage() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${apiLink}/products/${productId}`);
        setProductData(response.data);
      } catch (error) {
        console.log("Error fetching product data ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (productData?.Images?.length > 0) {
      setCurrentImage(productData.Images[0].image_location);
    }
  }, [productData]);

  const handleAddToCart = () => {
    dispatch(addItemToCart({ productId, quantity }));
  };

  if(error){
    console.log(error)
    return <div>error</div>
  }
  return (
    <>
      <NavBar />
      <Container sx={{ mt: 5, mb: 4 }}>
        <Box sx={{ p: 3, maxWidth: "1200px", margin: "auto" }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Grid2 container spacing={6}>
              {/* Left Section: Images */}
              <Grid2  xs={12} size={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* Main Image */}
                <CardMedia
                  component="img"
                  image={currentImage}
                  alt={productData?.name}
                  sx={{
                    width: "100%", 
                    maxHeight: "800px",
                    height: "auto", 
                    objectFit: "contain",
                  }}
                />

                {/* Thumbnail Images */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  {productData?.Images?.map((img, index) => (
                    <IconButton
                      key={index}
                      onClick={() => setCurrentImage(img.image_location)}
                      sx={{
                        borderRadius: "8px", // Rounded corners for thumbnails
                        border:
                          currentImage === img.image_location
                            ? "2px solid #424242"
                            : "1px solid #ccc", // Active/Inactive border
                        margin: "0 10px", // Spacing between thumbnails
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={img.image_location}
                        alt={`${productData?.title} ${index + 1}`}
                        sx={{ width: 100, height: 100, objectFit: "contain" }}
                      />
                    </IconButton>
                  ))}
                </Box>
              </Grid2>

              {/* Right Section: Product Details */}
              <Grid2 size={6}>
                <Box textAlign={"center"}>
                  <Typography variant="h4" gutterBottom textAlign={"start"}>
                    {productData?.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom textAlign={"start"}>
                    {productData?.description}
                  </Typography>
                  <Typography variant="h5" color="error.main" gutterBottom>
                    ${productData?.price}
                  </Typography>

                  {/* Quantity Selector */}
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2, justifyContent:"center" }}>
                    <IconButton
                      onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
                      aria-label="decrease"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ mx: 2 ,color:"black"}}>
                      {quantity}
                    </Typography>
                    <IconButton
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="increase"
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  {/* Add to Cart Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, backgroundColor: "", textAlign:"center" }}
                    onClick={handleAddToCart}
                    disabled={quantity === 0}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Grid2>
            </Grid2>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default ProductPage;
