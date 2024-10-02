import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Grid2,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { useLocation } from "react-router-dom";
import ProductForm from "./ProductForm";
import axios from "axios";
import apiLink from "../../data/ApiLink";

function EditProduct() {
  const { state } = useLocation();
  const [error, setError] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [imagesError, setImagesError] = useState(null);
  const [success, setSuccessMessage] = useState(null);
  const [title, setTitle] = useState(state.title || "");
  const [description, setDescription] = useState(state.description || "");
  const [price, setPrice] = useState(state.price || "");
  const [subcategory, setSubcategory] = useState("");
  const [originalSub, setOriginalSubcategory] = useState("");
  const [tags, setTags] = useState([]);
  const [originalTags, setOriginalTags] = useState([]);
  const [images, setImages] = useState([]);
  const [submited, setSubmited] = useState(null);
  const [loading, setLoading] = useState(false);
  const imgChangeWarning =
    "Any Image Changes will delete the pervious assinged images";
  // getting exiting subcats for product
  useEffect(() => {
    const getAssignedSubCat = async () => {
      try {
        const productId = state.id;
        const response = await axios.get(
          `${apiLink}/products/categoryAndSubcategory/${productId}`
        );
        const fetchedSubcategoryId =
          response.data.categories[0]?.subcategoryId || "";
        setSubcategory(fetchedSubcategoryId);
        setOriginalSubcategory(fetchedSubcategoryId);
      } catch (error) {
        setError(
          "Error fetching what subcategory this product is under: " + error
        );
      }
    };

    getAssignedSubCat();
  }, [state.id, success]);

  useEffect(() => {
    const fetchProductTags = async () => {
      try {
        const productId = state.id;
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("No access token found");

        const response = await axios.get(
          `${apiLink}/admin/product/tags/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.tags.length > 0) {
          const tagIds = response.data.tags.map((tag) => tag.tag_id);
          setTags(tagIds);
          setOriginalTags(tagIds);
        }
      } catch (error) {
        setError("Error fetching product tags: " + error.message);
      }
    };

    fetchProductTags();
  }, [state.id, success]);
  const haveTagsChanged = () => {
    if (tags.length !== originalTags.length) {
      return true;
    }

    const sortedTags = [...tags].sort();
    const sortedOriginalTags = [...originalTags].sort();

    return !sortedTags.every((tag, index) => tag === sortedOriginalTags[index]);
  };
  // submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setError(null);
    setSubmited(null);
    setImagesError(null);
    let currentErrors = [];

    if (
      state.title !== title ||
      state.description !== description ||
      state.price !== price ||
      images.length !== 0
    ) {
      try {
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
        const response = await axios.patch(
          `${apiLink}/admin/products/${state.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setSuccessMessage(response.data.message);
      } catch (error) {
        currentErrors.push("Error patching product" + error.message);
      }
    }

    if (originalSub !== subcategory) {
      try {
        if (originalSub) {
          await axios.delete(
            `${apiLink}/admin/subcategories/deleteFromProduct`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              data: {
                productId: state.id,
                subcategoryId: originalSub,
              },
            }
          );
        }
        await axios.post(
          `${apiLink}/admin/subcategories/assignToProduct`,
          {
            productId: state.id,
            subcategoryId: subcategory,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        setSuccessMessage((prev) =>
          prev
            ? `${prev} Product subcategory updated successfully`
            : ` Product subcategory updated successfully`
        );
      } catch (error) {
        currentErrors.push("Error updating subcategory: " + error.message);
      }
    }
    if (haveTagsChanged()) {
      if (originalTags.length !== 0) {
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (!accessToken) throw new Error("No access token found");
          await axios.delete(
            `${apiLink}/admin/removeTags`,

            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              data: {
                productId: state.id,
                tagIds: originalTags,
              },
            }
          );
        } catch (error) {
          currentErrors.push("Error deleting previous Tags", error.message);
        }
      }
      try {
        await axios.post(
          `${apiLink}/admin/addTags`,
          {
            productId: state.id,
            tagIds: tags,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setSuccessMessage((prev) =>
          prev
            ? `${prev} Tags assigned to product successfully.`
            : `Tags assigned to product successfully.`
        );
      } catch (error) {
        currentErrors.push("Error assigning tags to product: " + error.message);
      }
    }
    if (currentErrors.length > 0) {
      setError(currentErrors.join(" | "));
    }
    if (!error && !success) {
      setSubmited("No Changes occured");
    }
    setLoading(false);
  };

  return (
    <Grid2 container>
      <AdminSideBar></AdminSideBar>
      <Grid2 size={{ xs: 4, md: 9, lg: 10 }} sx={{ padding: 2 }}>
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            <AlertTitle>Success</AlertTitle>
            {success}
          </Alert>
        )}
        {submited && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {submited}
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
          imgChangeWarning={imgChangeWarning}
        ></ProductForm>
        <Grid2 container justifyContent="center" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? <CircularProgress size={24} /> : "Submit Product"}
          </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default EditProduct;
