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

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // ১. সুরক্ষিত ইউজার চেক ফাংশন
  const checkUser = () => {
    try {
      const savedUser = localStorage.getItem('user');
      
      // গুরুত্বপূর্ণ চেক: যদি ডাটা না থাকে বা স্ট্রিং হিসেবে "undefined" থাকে
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
      localStorage.removeItem('user'); // ভুল ডাটা থাকলে রিমুভ করে দেওয়া নিরাপদ
      setUser(null);
    }
  };

  // ২. রি-রেন্ডার নিশ্চিত করতে লিসেনার
  useEffect(() => {
    checkUser();

    // ইভেন্ট লিসেনার: অন্য কম্পোনেন্ট (যেমন Signin) থেকে সিগন্যাল পাওয়া
    const handleAuth = () => checkUser();
    
    window.addEventListener('storage', handleAuth);
    window.addEventListener('auth-change', handleAuth);

    return () => {
      window.removeEventListener('storage', handleAuth);
      window.removeEventListener('auth-change', handleAuth);
    };
  }, [location.pathname]); // পাথ চেঞ্জ হলে বাটন আপডেট হবে

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('auth-change')); // সবাইকে জানানো যে লগআউট হয়েছে
    handleProfileMenuClose();
    navigate('/signin');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(8px)', 
        color: '#333', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        zIndex: (theme) => theme.zIndex.drawer + 1 
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 5 } }}>
        
        <Typography 
          variant="h5" 
          component={Link} 
          to="/" 
          sx={{ fontWeight: '900', textDecoration: 'none', color: '#764ba2', letterSpacing: '-1px' }}
        >
          NeighborHelp
        </Typography>

        {!isMobile && (
          <Stack direction="row" spacing={3} alignItems="center">
            <Button 
              component={Link} to="/" 
              startIcon={<HomeIcon />}
              sx={{ 
                color: isActive('/') ? '#764ba2' : '#555', 
                fontWeight: '600',
                borderBottom: isActive('/') ? '2px solid #764ba2' : 'none',
                borderRadius: 0,
                height: '64px'
              }}
            >
              Home
            </Button>

            <Button 
              component={Link} to="/map" 
              variant={isActive('/map') ? "outlined" : "contained"}
              startIcon={<MapIcon />}
              sx={{ 
                bgcolor: isActive('/map') ? 'transparent' : '#764ba2', 
                color: isActive('/map') ? '#764ba2' : '#fff',
                borderRadius: '20px',
                px: 3,
                borderColor: '#764ba2',
                '&:hover': { bgcolor: isActive('/map') ? 'rgba(118, 75, 162, 0.1)' : '#5b3a7d' }
              }}
            >
              Find Help
            </Button>

            {user && (
              <Tooltip title="Messages">
                <IconButton 
                  component={Link} 
                  to="/messages" 
                  sx={{ 
                    color: location.pathname.includes('/messages') ? '#764ba2' : '#888',
                    bgcolor: location.pathname.includes('/messages') ? 'rgba(118, 75, 162, 0.1)' : 'transparent'
                  }}
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
                <Box sx={{ textAlign: 'right', mr: 1, display: { xs: 'none', lg: 'block' } }}>
                  <Typography variant="caption" sx={{ display: 'block', color: '#888', lineHeight: 1 }}>Welcome,</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>{user.name}</Typography>
                </Box>
                <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0, border: '2px solid #764ba2' }}>
                  <Avatar sx={{ width: 35, height: 35, bgcolor: '#764ba2' }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                </IconButton>
              </Stack>
            )}
          </Stack>
        )}

        {isMobile && (
          <Stack direction="row" spacing={1} alignItems="center">
             {user && (
              <IconButton 
                component={Link} 
                to="/messages" 
                sx={{ color: location.pathname.includes('/messages') ? '#764ba2' : '#555' }}
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
          PaperProps={{
            sx: { mt: 1.5, width: 200, borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }
          }}
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