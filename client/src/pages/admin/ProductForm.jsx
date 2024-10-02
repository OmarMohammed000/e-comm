// ProductForm.js
import React, { useState, useEffect } from "react";
import {
  Grid2,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Chip,
  OutlinedInput,
  IconButton,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import apiLink from "../../data/ApiLink";

const ProductForm = ({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  images,
  setImages,
  subcategory,
  setSubcategory,
  tags,
  setTags,
  subcategories,
  availableTags,
  imagesError,
  setImagesError,
  error,
  setSubcategories, 
  setAvailableTags,
  setError, 
  imgChangeWarning,
}) => {
  const [titleCharCount, setTitleCharCount] = useState(title.length);

  // Fetch Subcategories and Tags
  useEffect(() => {
    const getSubcategories = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("No access token found");
        const response = await axios.get(`${apiLink}/admin/subcategories`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSubcategories(response.data);
      } catch (error) {
        setError("Error fetching subcategories");
      }
    };
    const getTags = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("No access token found");
        const response = await axios.get(`${apiLink}/admin/tags`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setAvailableTags(response.data);
      } catch (error) {
        setError("Error fetching tags");
      }
    };
    getSubcategories();
    getTags();
  }, [setAvailableTags, setSubcategories, setError]);

  // Image Validation
  const validateImage = (image) => {
    const validFormats = ["image/jpeg", "image/png", "image/jpg",'image/webp'];
    const maxSizeMB = 3;

    if (!validFormats.includes(image.type)) {
      return {
        valid: false,
        errorMessage: "Accepted formats are: JPG, JPEG, PNG.",
      };
    }

    const imageSizeMB = image.size / 1024 / 1024;
    if (imageSizeMB > maxSizeMB) {
      return {
        valid: false,
        errorMessage: `Maximum allowed size is ${maxSizeMB}MB.`,
      };
    }

    return { valid: true };
  };

  const handleImageUpload = (e) => {
    const uploadedImages = Array.from(e.target.files);
    const validImages = [];
    let imageError = null;

    uploadedImages.forEach((image) => {
      const validation = validateImage(image);
      if (validation.valid) {
        validImages.push(image);
      } else {
        imageError = validation.errorMessage;
      }
    });

    setImages(validImages);
    setImagesError(imageError);
  };

  const handleImageDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= 55) {
      setTitle(newTitle);
      setTitleCharCount(newTitle.length);
    }
  };

  return (
    <Grid2 container>
      <Grid2 size={12} sx={{ padding: 2 }}>
        {imagesError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {imagesError}
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>
          {/* Product Title */}
          <TextField
            label="Product Title"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={handleTitleChange}
            sx={{ mb: 1 }}
            inputProps={{ maxLength: 55 }}
          />
          <Typography variant="caption">
            {titleCharCount}/55 characters
          </Typography>

          {/* Product Description */}
          <TextField
            label="Product Description"
            variant="outlined"
            fullWidth
            required
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3, mt: 2 }}
          />

          {/* Product Price */}
          <TextField
            label="Product Price"
            variant="outlined"
            fullWidth
            required
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* Product Images */}
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload Images
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
            <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap" }}>
              {imgChangeWarning&& <Alert severity="warning">{imgChangeWarning}</Alert>}
              {images.map((image, index) => (
                <Box key={index} sx={{ position: "relative", mr: 1, mb: 1 }}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <IconButton
                    onClick={() => handleImageDelete(index)}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Subcategory Selection */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="subcategory-label">Subcategory</InputLabel>
            <Select
              labelId="subcategory-label"
              id="subcategory"
              value={subcategory}
              label="Subcategory"
              onChange={(e) => setSubcategory(e.target.value)}
              required
            >
              {subcategories.map((subcat) => (
                <MenuItem key={subcat.id} value={subcat.id}>
                  {subcat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Tags Selection */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="tags-label" variant="filled">
              Tags
            </InputLabel>
            <Select
              labelId="tags-label"
              id="tags"
              multiple
              value={tags} // tags stores the selected tag IDs
              onChange={(e) => setTags(e.target.value)} // tag IDs are stored in state
              input={<OutlinedInput id="select-multiple-chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((tagId) => {
                    const tag = availableTags.find(
                      (tag) => tag.tag_id === tagId
                    ); // Find the tag by ID
                    return <Chip key={tagId} label={tag?.tag_name} />; // Display the tag_name
                  })}
                </Box>
              )}
            >
              {availableTags.map((tag) => (
                <MenuItem key={tag.tag_id} value={tag.tag_id}>
                  {tag.tag_name}{" "}
                  {/* This displays the tag_name in the dropdown */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default ProductForm;
