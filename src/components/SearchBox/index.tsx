import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: "100%"
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "#456C97",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
  }
}));

interface Props {
  onSearch: (s: string) => void;
  width?: number;
  placeholder?: string;
}

export default function SearchBar(props: Props) {
  const { onSearch, width = 300, placeholder = "Search..." } = props;

  const debouncedHandleChange = React.useCallback(
    debounce((v) => onSearch(v), 800),
    []
  );

  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon style={{color: "#456C97"}}/>
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={placeholder}
          inputProps={{ "aria-label": "search" , color: "#456C97"}}
          onChange={(e) => {
            debouncedHandleChange(e.target.value);
          }}
          sx={{ width: `${width}px` }}
        />
      </Search>
    </Box>
  );
}