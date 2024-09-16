import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiLink from "../data/ApiLink";
import axios from "axios";
import NavBar from "../components/NavBar";
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
      {value.length > 0 ? (
        value.map((item, index) => (
        <div key={index}>{item.title} {item.description} {item.price}</div>
       

        )) // Assuming 'title' is a field in the response
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
}

export default SearchResult;
