/** @format */

import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

const NavbarComponent = () => {
  const Search = styled("div")({
    position: "relative",
    borderRadius: "8px",
    backgroundColor: "transparent",
    marginLeft: 0,
    display: "flex",
    justifyContent: "end",
    width: "100%",
  });

  const SearchIconWrapper = styled(IconButton)({
    border: "none",
    borderRadius: 0,
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
    backgroundColor: "#DDDDDD",

    "&:hover": {
      backgroundColor: "#DDDDDD",
    },
  });

  const InputSearch = styled(InputBase)({
    border: "none",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    width: "50%",
    maxHeight: "max-content",
    paddingLeft: "10px",
    backgroundColor: "#DDDDDD",
  });

  return (
    <AppBar position='static' color='info'>
      <Toolbar>
        <Box display='flex' alignItems='center'>
          <IconButton>
            <HomeIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            USER
          </Typography>
        </Box>

        <Search>
          <InputSearch placeholder='Search' />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Search>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;
