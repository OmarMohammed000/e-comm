// CreateProduct.js
import React, { useState } from "react";
import { Grid2, Typography, Alert, AlertTitle, Button, CircularProgress } from "@mui/material";
import AdminSideBar from "./AdminSideBar";
import axios from "axios";
import apiLink from "../../data/ApiLink";
import ProductForm from "./ProductForm";

function CreateProduct() {
  const [error, setError] = useState(null);
  const [subcategoryError, setSubcategoryError] = useState(null);
  const [tagError, setTagError] = useState(null);
  const [imagesError, setImagesError] = useState(null);
  const [success, setSuccessMessage] = useState(null);
  const [loading,setLoading]=useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setSuccessMessage(null);
    setError(null);
    setSubcategoryError(null);
    setTagError(null);
    setImagesError(null);

    try {
      // Product creation
      const formData = new FormData();
      const productData = {
        title: title,
        description: description,
        price: price,
      };
      formData.append("data", JSON.stringify(productData));
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios.post(`${apiLink}/admin/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const productId = response.data.product.id;
      setSuccessMessage("Product added successfully");

      if (subcategory) {
        try {
          await axios.post(
            `${apiLink}/admin/subcategories/assignToProduct`,
            {
              productId: productId,
              subcategoryId: subcategory,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          setSuccessMessage(
            (prev) => `${prev} Product assigned to subcategory.`
          );
        } catch (error) {
          setSubcategoryError(
            "Error assigning product to subcategory: " + error.message
          );
        }
      }

      // Assign tags to product
      if (tags.length > 0) {
        try {
          await axios.post(
            `${apiLink}/admin/addTags`,
            {
              productId: productId,
              tagIds: tags,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          setSuccessMessage(
            (prev) => `${prev} Tags assigned to product successfully.`
          );
        } catch (error) {
          setTagError("Error assigning tags to product: " + error.message);
        }
      }
    } catch (error) {
      setError("Error in product creation: " + error.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <Grid2 container>
      <AdminSideBar></AdminSideBar>
      <Grid2 size={{ xs: 4, md: 9, lg: 10 }} sx={{ padding: 2 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            <AlertTitle>Success</AlertTitle>
            {success}
          </Alert>
        )}

        {subcategoryError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <AlertTitle>Subcategory Assignment Error</AlertTitle>
            {subcategoryError}
          </Alert>
        )}
        {tagError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <AlertTitle>Tag Assignment Error</AlertTitle>
            {tagError}
          </Alert>
        )}
        <Typography variant="h4" textAlign={"center"} sx={{ mt: 3 }}>
          Create Product
        </Typography>

        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}

        <ProductForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          images={images}
          setImages={setImages}
          subcategory={subcategory}
          setSubcategory={setSubcategory}
          tags={tags}
          setTags={setTags}
          subcategories={subcategories}
          availableTags={availableTags}
          imagesError={imagesError}
          setImagesError={setImagesError}
          error={error}
          setSubcategories={setSubcategories}
          setAvailableTags={setAvailableTags}
          setError={setError}
        />

        {/* Button for submission */}
        <Grid2 container justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
            {loading? (<CircularProgress size={24}/> ):("Submit Product")}
          </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default CreateProduct;
