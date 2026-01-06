import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, 
  Box, Avatar, Menu, MenuItem, Badge, Divider, Tooltip, Stack, useMediaQuery, useTheme 
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Map as MapIcon, 
  Chat as ChatIcon, 
  Logout, 
  Person,
  Home as HomeIcon
} from '@mui/icons-material';

// CSS ফাইল ইমপোর্ট
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // ১. সুরক্ষিত ইউজার চেক ফাংশন (Original Logic)
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
      console.error("Navbar JSON parse error:", error);
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  // ২. রি-রেন্ডার নিশ্চিত করতে লিসেনার (Original Logic)
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

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="sticky" className="navbar-root" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 5 } }}>
        
        <Typography 
          variant="h5" 
          component={Link} 
          to="/" 
          className="logo-text"
        >
          NeighborHelp
        </Typography>

        {!isMobile && (
          <div className="desktop-stack">
            <Button 
              component={Link} to="/" 
              startIcon={<HomeIcon />}
              className={`nav-home-btn ${isActive('/') ? 'nav-home-active' : 'nav-home-inactive'}`}
            >
              Home
            </Button>

            <Button 
              component={Link} to="/map" 
              variant={isActive('/map') ? "outlined" : "contained"}
              startIcon={<MapIcon />}
              className={`nav-map-btn ${isActive('/map') ? 'nav-map-active' : 'nav-map-inactive'}`}
            >
              Find Help
            </Button>

            {user && (
              <Tooltip title="Messages">
                <IconButton 
                  component={Link} 
                  to="/messages" 
                  className={location.pathname.includes('/messages') ? 'msg-icon-active' : 'msg-icon-inactive'}
                >
                  <Badge variant="dot" color="error">
                    <ChatIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {!user ? (
              <Stack direction="row" spacing={1}>
                <Button component={Link} to="/signin" sx={{ color: '#764ba2', fontWeight: 'bold' }}>Sign In</Button>
                <Button 
                  component={Link} to="/signup" 
                  variant="outlined" 
                  sx={{ borderRadius: '20px', borderColor: '#764ba2', color: '#764ba2' }}
                >
                  Sign Up
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 2 }}>
                <Box className="profile-welcome">
                  <Typography variant="caption" sx={{ display: 'block', color: '#888', lineHeight: 1 }}>Welcome,</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>{user.name}</Typography>
                </Box>
                <IconButton onClick={handleProfileMenuOpen} className="avatar-btn">
                  <Avatar sx={{ width: 35, height: 35, bgcolor: '#764ba2' }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                </IconButton>
              </Stack>
            )}
          </div>
        )}

        {isMobile && (
          <Stack direction="row" spacing={1} alignItems="center">
             {user && (
              <IconButton 
                component={Link} 
                to="/messages" 
                className={location.pathname.includes('/messages') ? 'mobile-icon-active' : 'mobile-icon-inactive'}
              >
                <Badge variant="dot" color="error">
                  <ChatIcon />
                </Badge>
              </IconButton>
            )}
            <IconButton onClick={handleProfileMenuOpen}>
              {user ? (
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#764ba2' }}>
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
              ) : (
                <MenuIcon sx={{ color: '#764ba2' }} />
              )}
            </IconButton>
          </Stack>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          PaperProps={{ className: 'menu-paper' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {user ? [
            <MenuItem key="profile" onClick={() => { handleProfileMenuClose(); navigate('/profile'); }}>
              <Person sx={{ mr: 2, fontSize: 20 }} /> Profile
            </MenuItem>,
            <Divider key="div" />,
            <MenuItem key="logout" onClick={handleLogout} sx={{ color: 'error.main' }}>
              <Logout sx={{ mr: 2, fontSize: 20 }} /> Logout
            </MenuItem>
          ] : [
            <MenuItem key="msignin" onClick={handleProfileMenuClose} component={Link} to="/signin">Sign In</MenuItem>,
            <MenuItem key="msignup" onClick={handleProfileMenuClose} component={Link} to="/signup">Sign Up</MenuItem>,
            <MenuItem key="mmap" onClick={handleProfileMenuClose} component={Link} to="/map">Find Help</MenuItem>
          ]}
        </Menu>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;