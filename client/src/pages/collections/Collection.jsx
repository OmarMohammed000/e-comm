import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiLink from "../../data/ApiLink";
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Grid2,
  Link,
  Pagination,
  Typography,
} from "@mui/material";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import Tags from "./Tags";
function BreadcrumpsOverAll({ state, subOrcategoryName }) {
  const navigate = useNavigate();
  if (state.nameOfSub) {
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mt: 5, mb: 5, ml: 3, color: "black" }}
      >
        <Link underline="hover" color="#979797" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="#979797"
          onClick={() => {
            navigate(`/collection/${state.category}`, {
              state: {
                categoryId: state.categoryId,
              },
            });
          }}
        >
          {state.category}
        </Link>
        <Typography sx={{ color: "text.primary" }}>
          {subOrcategoryName}
        </Typography>
      </Breadcrumbs>
    );
  } else if (state.categoryId) {
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mt: 5, mb: 5, ml: 3, color: "black" }}
      >
        <Link underline="hover" color="#979797" href="/">
          Home
        </Link>
        <Typography sx={{ color: "text.primary" }}>
          {subOrcategoryName}
        </Typography>
      </Breadcrumbs>
    );
  }
}
function Collection() {
  const { subOrcategoryName } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  // Pagination states

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Display 5 products per page

  useEffect(() => {
    if (!state) {
      navigate("/");
    } else if (state.subId) {
      const fetchProductFromSub = async () => {
        try {
          const response = await axios.get(
            `${apiLink}/products/subcategory/${state.subId}`
          );
          setProducts(response.data);
          setFilteredProducts(response.data)
        } catch (error) {
          setError("Error Fetching products: " + error);
          return navigate("/");
        } finally {
          setLoading(false);
        }
      };
      fetchProductFromSub();
    } else if (state.categoryId) {
      const fetchProductFromcato = async () => {
        try {
          const response = await axios.get(
            `${apiLink}/products/category/${state.categoryId}`
          );
          setProducts(response.data);
        } catch (error) {
          setError("Error Fetching products: " + error);
        } finally {
          setLoading(false);
        }
      };
      fetchProductFromcato();
    }
  }, [state, navigate]);
  // Paginate products based on current page

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];
  const maxAmountOfPages = products
    ? Math.ceil(filteredProducts.length / itemsPerPage)
    : 2;

  // Handle page change

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  // Render the page content conditionally
  if (!state) {
    return <div>Redirecting...</div>; // Render this if redirection is in process
  }
  if (error) {
    return <div>{error}</div>;
  }
  console.log(filteredProducts);
  return (
    <div>
    <NavBar />

    {/* Breadcrumbs */}
    <BreadcrumpsOverAll state={state} subOrcategoryName={subOrcategoryName} />

    {/* Category/Subcategory Title */}
    <Typography variant="h4" textAlign="center" mt={2}>
      {subOrcategoryName}
    </Typography>
    <hr />

    {/* Conditional Rendering for Loading State */}
    {loading ? (
      <Box textAlign="center" mt={3}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    ) : (
      <Container maxWidth={false} sx={{width:"100%"}}>
        {/* Flexbox for Tags and Product Grid */}
        <Box sx={{ mt: 3, mb: 3, display: 'flex' }}>
          {/* Sidebar for Tags */}
          <Box
            sx={{
              minWidth: '200px', // Sidebar width
              mr: 3, // Margin between sidebar and product grid
            }}
          >
            <Tags
              subcategoryId={state.subId}
              currentProducts={products}
              setFilteredProducts={setFilteredProducts}
            />
          </Box>

          {/* Product Grid */}
          <Box sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={3}>
              {currentProducts .length > 0 ? (
                currentProducts .map((item, index) => (
                  <Grid2 item xs={12} sm={6} md={4} lg={3} key={index}>
                    <ProductCard
                      price={item.price}
                      title={item.title}
                      imgs={item.Images}
                    />
                  </Grid2>
                ))
              ) : (
                <Box textAlign="center" width="100%">
                  <Typography variant="h6" mt={3}>
                    No results found
                  </Typography>
                </Box>
              )}
            </Grid2>

            {/* Pagination Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={maxAmountOfPages}
                page={currentPage}
                onChange={handleChange}
                size="large"
              />
            </Box>
          </Box>
        </Box>
      </Container>
    )}

    <Footer />
  </div>
  );
}

export default Collection;
