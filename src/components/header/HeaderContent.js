import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Link } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../constants/AppContext";
import AccountMenu from "./AccountMenu";

const headerStyles = {
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.04),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.07),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    color: "#000",
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
      },
      [theme.breakpoints.up('md')]: {
        width: '40ch',
      },
      
    },
}));

function HeaderContent() {
    let navigate = useNavigate();
 
    const { appContext, appCallback } = useContext(AppContext);
   
    const showShareModal = () => {
        appCallback.showShare();
    }

    const handleSearch = (e) => { 
        appCallback.handleSearchChange(e.target.value);
        
    }

    return (
        <React.Fragment>
            <Box sx={headerStyles}>
                <a href="/">
                    <img
                        src="YouTube_Logo_2017.svg"
                        style={{ height: "30px" }}
                    />
                </a>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleSearch}
                        value={appContext.searchQuery}
                    />
                </Search>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {appContext.currentUser && (
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ height: "40px" }}
                            style={{
                                borderRadius: 25,
                                backgroundColor: "rgb(255 82 82)",
                                padding: "10px 20px",
                                fontSize: "15px",
                                color: "#fff"
                            }}
                            onClick={showShareModal}
                        >
                            Share video
                        </Button>
                    )}
                    <AccountMenu />
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default HeaderContent;
