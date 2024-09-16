import React, { useRef, useState } from "react";
import { IconButton, Stack, Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiLink from "../data/ApiLink";

function SearchComponent() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchlist, setSearchlist] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef(null);
  const debounceTimeoutRef = useRef(null); // Ref for debounce timeout

  // Toggle search bar visibility
  const handleSearchIconClick = () => {
    setIsSearchOpen((prev) => !prev);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus(); // Focus the input field after the search box is visible
      }, 0);
    }
  };

  // Debounced search input change handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current); // Clear previous timeout
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (value) {
        fetchSearchResults(value);
      } else {
        setSearchlist([]); // Reset if input is cleared
      }
    }, 500); // 500ms delay for debouncing
  };

  // Fetch search results from API
  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiLink}/product/search?product=${query}`);
      setSearchlist(response.data);
    } catch (error) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  // Handle search submit and navigate
  const handleSearchSubmit = () => {
    if (searchInput) {
      navigate(`/search?query=${searchInput}`);
    }
  };

  const displayStyle = isSearchOpen && "none";

  return (
    <>
      {/* Search Icon Button */}
      <IconButton size="large" aria-label="search" color="inherit" onClick={handleSearchIconClick}>
        <SearchIcon sx={{ display: displayStyle }} />
      </IconButton>

      {/* Conditionally Render Search Bar */}
      {isSearchOpen && (
        <Stack spacing={2} sx={{ width: 300, borderRadius: "5px", padding: "10px" }}>
          {/* Autocomplete Search Input */}
          <Autocomplete
            freeSolo
            disableClearable
            options={searchlist.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                inputRef={searchInputRef}
                {...params}
                placeholder="Search..."
                type="search"
                variant="outlined"
                size="small"
                value={searchInput}
                onChange={handleSearchChange}
                onBlur={handleSearchIconClick}
                sx={{ flex: 1, "& .MuiInputBase-root": { borderRadius: "5px", bgcolor: "#f5f5f5" } }}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    type: "search",
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleSearchSubmit}
                          edge="end"
                          size="small"
                          disabled={loading || !searchInput}
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
        </Stack>
      )}
    </>
  );
}

export default SearchComponent;
