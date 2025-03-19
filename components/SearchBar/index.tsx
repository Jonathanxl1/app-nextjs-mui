import { Grid2, IconButton, InputAdornment, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent, useEffect } from "react";
import { usePropertiesStore } from "@/store/properties.store";
import { useStoreApp } from "@/store/application.store";
import { useTypeStore } from "@/store/types.store";

function SearchBar() {
  const { search, setSearch } = useStoreApp();
  const { filterProperties } = usePropertiesStore();
  const { filterTypes } = useTypeStore();

  useEffect(() => {
    if (search && search.trim()) {
      const searchLowerCase = search.toLowerCase();

      filterProperties(searchLowerCase);
      filterTypes(searchLowerCase);
    }

    return () => {};
  }, [search]);

  function searchInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = e.target.value;
    if (value) {
      setSearch(value);
    } else {
      setSearch("");
    }
  }

  function cleanInput() {
    setSearch("");
  }

  return (
    <Grid2
      container
      size={{ lg: 10 }}
      sx={{
        justifyContent: "center",
        my: "30px",
      }}
    >
      <Grid2 size={{ md: 6, xs: 10 }}>
        <TextField
          label="Search"
          placeholder="Search"
          variant="standard"
          sx={{
            width: "100%",
          }}
          value={search}
          size="medium"
          onChange={searchInput}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton onClick={cleanInput}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
        />
      </Grid2>
    </Grid2>
  );
}

export default SearchBar;
