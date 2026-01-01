import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, 
  Box, Avatar, Menu, MenuItem, Badge, Divider, Tooltip, Stack, useMediaQuery, useTheme, TextField
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Map as MapIcon, 
  Chat as ChatIcon, 
  Logout, 
  Person,
  Home as HomeIcon,
  Send
} from '@mui/icons-material';

import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const checkUser = () => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && (parsedUser.id || parsedUser._id)) {
          setUser(parsedUser);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
    const handleAuth = () => checkUser();
    window.addEventListener('storage', handleAuth);
    window.addEventListener('auth-change', handleAuth);
    return () => {
      window.removeEventListener('storage', handleAuth);
      window.removeEventListener('auth-change', handleAuth);
    };
  }, [location.pathname]);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
    handleProfileMenuClose();
    navigate('/signin');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="sticky" className="navbar-root">
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 5 } }}>
        
        {/* Logo */}
        <Typography variant="h5" component={Link} to="/" className="logo-text">
          NeighborHelp
        </Typography>

        {/* Desktop View */}
        {!isMobile && (
          <div className="desktop-stack">
            <Button component={Link} to="/" startIcon={<HomeIcon />}
              className={`nav-btn ${isActive('/') ? 'active' : ''}`}>
              Home
            </Button>

            <Button component={Link} to="/map" startIcon={<MapIcon />}
              className={`nav-btn ${isActive('/map') ? 'active' : ''}`}>
              Find Help
            </Button>

            {/* Email Subscription Field */}
            <Box component="form" onSubmit={handleSubscribe} className="subscribe-box">
              <input 
                type="email" 
                placeholder="Subscribe for updates" 
                className="sub-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="sub-btn"><Send sx={{fontSize: 18}}/></button>
            </Box>

            {user && (
              <IconButton component={Link} to="/messages" 
                className={location.pathname.includes('/messages') ? 'msg-active' : ''}>
                <Badge variant="dot" color="error">
                  <ChatIcon />
                </Badge>
              </IconButton>
            )}

            {!user ? (
              <Stack direction="row" spacing={1}>
                <Button component={Link} to="/signin" className="auth-btn-text">Sign In</Button>
                <Button component={Link} to="/signup" variant="contained" className="auth-btn-contained">
                  Sign Up
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar onClick={handleProfileMenuOpen} className="user-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>
              </Stack>
            )}
          </div>
        )}

        {/* Mobile View */}
        {isMobile && (
          <Stack direction="row" spacing={1} alignItems="center">
            {user && (
              <IconButton component={Link} to="/messages">
                <Badge variant="dot" color="error"><ChatIcon /></Badge>
              </IconButton>
            )}
            <IconButton onClick={handleProfileMenuOpen}>
              {user ? (
                <Avatar sx={{ width: 32, height: 32 }}>{user.name?.charAt(0).toUpperCase()}</Avatar>
              ) : (
                <MenuIcon />
              )}
            </IconButton>
          </Stack>
        )}

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          className="navbar-menu"
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {user ? [
            <MenuItem key="profile" onClick={() => { handleProfileMenuClose(); navigate('/profile'); }}>
              <Person sx={{ mr: 1 }} /> Profile
            </MenuItem>,
            <Divider key="d1" />,
            <MenuItem key="logout" onClick={handleLogout} sx={{ color: 'error.main' }}>
              <Logout sx={{ mr: 1 }} /> Logout
            </MenuItem>
          ] : [
            <MenuItem key="li" component={Link} to="/signin" onClick={handleProfileMenuClose}>Sign In</MenuItem>,
            <MenuItem key="su" component={Link} to="/signup" onClick={handleProfileMenuClose}>Sign Up</MenuItem>
          ]}
          
          <Divider />
          
          {/* Credit Section */}
          <Box className="menu-credit">
            <Typography variant="caption">Developed & Designed by</Typography>
            <Typography 
              variant="body2" 
              component="a" 
              href="https://github.com/themijanur-9292" 
              target="_blank"
              className="credit-link"
            >
              Md Mijanur Molla
            </Typography>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;