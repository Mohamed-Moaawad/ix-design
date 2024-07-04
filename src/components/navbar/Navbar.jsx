import React, { useState } from "react";
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";
// MUI
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from "@mui/icons-material/MoreVert";
import UserAvatar from "./avatar/UserAvatar";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
//
// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";





const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "150%",
        },
    },
}));



const Navbar = ({onDataChange, disabled, path}) => {
    // User Firebase
    const [user , loading, error] = useAuthState(auth)


    const [inputValue, setInputValue] = useState('');

    const inputChange = (e)=>{
        setInputValue(e.target.value)
        // ببعت للهوم داتا من الفنكشن دي
        onDataChange(e.target.value.toLowerCase())
    }

    const navigate = useNavigate()

    // Function Log Out User
    const logOutUser = async()=>{
        await signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/register')
        }).catch((error) => {
            // An error happened.
        });
    }




    //============== MUI ==================
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event) => {
        if(user){
            setAnchorEl(event.currentTarget);
        }else{
            navigate('/register')
        }
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    
    

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            >
            <MenuItem onClick={handleMenuClose}>
            <Link to={user ? '/profile' : '/register'} style={{textDecoration:'none', display:'flex',alignItems:'center', color:'var(--main-color)', width:'100%'}}>
                Profile
            </Link>
            </MenuItem>
            <MenuItem onClick={logOutUser} 
            sx={{
                borderRadius:'8px',
                background:'var(--delete-color)',
                color:'#fff',
                '&:hover':{
                    background:'red'
                }
            }}>
                <div className="log-uot-div">
                    Log out
                </div>
            </MenuItem>
        </Menu>
    );


    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <div className="btn-upload-post-small">
                    <Link to={user ? '/add-post' : '/register'}>
                        upload
                        <CloudUploadIcon />
                    </Link>
                </div>
            </MenuItem>
            <MenuItem
                onClick={handleProfileMenuOpen}
            >
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        {user ? <UserAvatar user={user} /> : <AccountCircle />}
                    </IconButton>
                    <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box className='navbar-component' sx={{ flexGrow: 1 }} >
            <AppBar className="app-bar-box" position="static">
                <Toolbar className="tool-bar-box">
                    <Link to='/' className="logo-image">
                        <img src={`${path}images/Logo/logo-text-w.png`} alt="logo" />
                    </Link>


                    <Search className="search-box">
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                            value={inputValue}
                            onChange={inputChange}
                            disabled={disabled}
                        />
                    </Search>



                    <Box sx={{ display: { xs: "none", md: "flex" } , alignItems:'center'}}>
                        <div className="btn-upload-post">
                            <Link to={user ? '/add-post' : '/register'}>
                                upload
                                <CloudUploadIcon />
                            </Link>
                        </div>
                        <Link to='/profile'>

                        </Link>
                        <Link>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                color="inherit"
                                className="icon-avatar"
                                onClick={handleProfileMenuOpen}
                            >
                                {user ? <UserAvatar user={user} /> : <AccountCircle />}
                            </IconButton>
                        </Link>
                    </Box>


                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
};

export default Navbar;