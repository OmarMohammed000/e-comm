import { Box, Menu, MenuItem, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import apiLink from "../data/ApiLink";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function NavItems() {
  const navigate = useNavigate();
  const [categoriesAndSubCategories, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiLink}`);
        setDate(response.data);
      } catch (error) {
        setError("Error fetching Categories data ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event, categoryId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(categoryId);
  };
  // Handle clicking to close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  // Toggle menu open/close
  const handleMenuToggle = (event, categoryId) => {
    if (anchorEl) {
      handleMenuClose();
    } else {
      handleMenuOpen(event, categoryId);
    }
  };
  // Navigating to the subcategory

  if (error) return <p>{error}</p>;

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        ml: "auto",
        mr: "auto",
        pr: 5,
        textAlign: "center",
      }}
    >
      {loading ? (
        <Skeleton variant="text" width="100%" />
      ) : (
        categoriesAndSubCategories.map((category) => (
          <Box
            key={category.id}
            id={category.id}
            onClick={(event) => handleMenuToggle(event, category.id)}
            sx={{ cursor: "pointer", color: "white", ml: 5 }}
          >
            <Typography variant="h6" sx={{}}>
              {category.name.toUpperCase()}
            </Typography>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={selectedCategory === category.id && Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ display: { xs: "block" } }}
            >
              <MenuItem
                onClick={() => {
                  navigate(`/collection/${category.name}`, {
                    state: {
                      categoryId: category.id,
                    },
                  });
                }}
              >
                All Clothing
              </MenuItem>
              {category.Subcategories.map((subcategory, index) => (
                <MenuItem
                  onClick={() => {
                    navigate(`/collection/${subcategory.name}`, {
                      state: {
                        nameOfSub: subcategory.name,
                        category: category.name,
                        subId: subcategory.id,
                        categoryId: category.id,
                      },
                    });
                  }}
                  key={index}
                >
                  {subcategory.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ))
      )}
    </Box>
  );
}

export default NavItems;
