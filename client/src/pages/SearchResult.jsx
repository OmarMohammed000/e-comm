import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiLink from "../data/ApiLink";
import axios from "axios";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { Container, Divider, Grid, Grid2, Typography } from "@mui/material";
function SearchResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiLink}/product/search?product=${query}`
        );
        setValue(response.data); // Set the response data to value
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]); // Add query as a dependency to trigger the effect when it changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <NavBar></NavBar>
      <Container sx={{mt:5, mb:5}}>
        
        <Divider>
          <Typography variant="h4">{value.length} RESULTS FOUND FOR {query}</Typography>
        </Divider>
      </Container>
      <Container sx={{ py: 4 }}>
        <Grid2 container spacing={3}>
          {value.length > 0 ? (
            value.map((item, index) => (
              <Grid2 item xs={12} sm={6} md={4} lg={3} key={index}>
                {" "}
                {/* xs, sm, md, lg control the number of columns */}
                <ProductCard
                  price={item.price}
                  title={item.title}
                  imgs={item.Images}
                />
              </Grid2>
            ))
          ) : (
            <div>No results found</div>
          )}
        </Grid2>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default SearchResult;
