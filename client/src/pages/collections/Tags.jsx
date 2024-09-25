import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import axios from "axios";
import apiLink from "../../data/ApiLink";

function Tags({ subcategoryId, currentProducts, setFilteredProducts }) {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      const response = await axios.get(`${apiLink}/admin/tags`);
      setTags(response.data);
    };
    fetchTags();
  }, []);

  // Handle tag selection
  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag) // Remove tag if unchecked
        : [...prevTags, tag] // Add tag if checked
    );
  };

  // Fetch and filter products based on selected tags
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (selectedTags.length > 0) {
        try {
          let response;
          // API call based on the subcategory if provided
          if (subcategoryId) {
            response = await axios.get(
              `${apiLink}/product/subcategory/${subcategoryId}/filter`,
              {
                params: { tags: selectedTags.join(",") },
              }
            );
          } else {
            response = await axios.get(`${apiLink}/product/filter`, {
              params: { tags: selectedTags.join(",") },
            });
          }

          const filteredTagProducts = response.data;

          // Match products that exist in both currentProducts and filteredTagProducts
          const filtered = currentProducts.filter((product) =>
            filteredTagProducts.some(
              (tagProduct) => tagProduct.id === product.id
            )
          );

          setFilteredProducts(filtered); // Update the filtered products list
        } catch (error) {
          console.error("Error fetching products by tags:", error);
          setFilteredProducts([])
        }
      } else {
        // If no tags selected, reset to original currentProducts
        setFilteredProducts(currentProducts);
      }
    };

    fetchFilteredProducts();
  }, [selectedTags, subcategoryId, currentProducts, setFilteredProducts]);

  return (
    <Box
      sx={{
        minWidth: "200px",
        mr: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" color="black">
        Tags
      </Typography>
      <Divider sx={{ backgroundColor: "grey" }}></Divider>
      {tags.map((tag, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={selectedTags.includes(tag.tag_name)}
              onChange={() => handleTagChange(tag.tag_name)}
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "black",
                },
              }}
            />
          }
          label={tag.tag_name}
          sx={{
            mb: 1,
          }}
        />
      ))}
    </Box>
  );
}

export default Tags;
