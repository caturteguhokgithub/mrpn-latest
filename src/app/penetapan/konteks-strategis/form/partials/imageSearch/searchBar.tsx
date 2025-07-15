import { IconFA } from "@/components/icons/icon-fa";
import { Box, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { useState } from "react";

const SearchBar = ({ onSearch }: { onSearch: any }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };
  const handleClearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <Box>
      <OutlinedInput
        type="text"
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari stakeholder"
        onKeyUp={handleSearch}
        sx={{ width: "100%", zoom: 0.9 }}
        endAdornment={
          <InputAdornment position="end" sx={{ cursor: "pointer" }}>
            {query !== "" && (
              <IconFA name="xmark" size={20} onclick={handleClearSearch} />
            )}
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default SearchBar;
