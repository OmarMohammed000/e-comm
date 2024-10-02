import React, { useRef, useState } from "react";
import {
  IconButton,
  Stack,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
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
  const debounceTimeoutRef = useRef(null);

  const handleSearchIconClick = () => {
    setIsSearchOpen((prev) => !prev);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (value) {
        fetchSearchResults(value);
      } else {
        setSearchlist([]);
      }
    }, 500);
  };

  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiLink}/product/search?product=${query}`
      );
      setSearchlist(response.data);
    } catch (error) {
      setError("Error fetching products " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    if (searchInput) {
      navigate(`/search?query=${searchInput}`);
    }
  };

  const displayStyle = isSearchOpen && "none";

  return (
    <>
      <IconButton
        size="large"
        aria-label="search"
        color="inherit"
        onClick={handleSearchIconClick}
      >
        <SearchIcon sx={{ display: displayStyle }} />
      </IconButton>

      {isSearchOpen && (
        <Stack
          spacing={2}
          sx={{ width: 300, borderRadius: "5px", padding: "10px" }}
        >
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit();
                  }
                }}
                onChange={handleSearchChange}
                onBlur={handleSearchIconClick}
                sx={{
                  flex: 1,
                  "& .MuiInputBase-root": {
                    borderRadius: "5px",
                    bgcolor: "#f5f5f5",
                  },
                }}
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
