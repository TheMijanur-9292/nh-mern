import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, 
  Box, Avatar, Menu, MenuItem, Badge, Divider, Tooltip, Stack, useMediaQuery, useTheme,
  Drawer, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Map as MapIcon, 
  Chat as ChatIcon, 
  Logout, 
  Person,
  Home as HomeIcon,
  Info as InfoIcon,
  Shield as ShieldIcon,
  Phone as PhoneIcon,
  AppRegistration as SignUpIcon,
  Login as SignInIcon,
  Policy as PolicyIcon,
  Gavel as TermsIcon,
  Close as CloseIcon,
  FavoriteBorder as StoriesIcon
} from '@mui/icons-material';

// CSS ফাইল ইমপোর্ট
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
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

  const handleMobileDrawerOpen = () => setMobileDrawerOpen(true);
  const handleMobileDrawerClose = () => setMobileDrawerOpen(false);

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
            <IconButton onClick={handleMobileDrawerOpen}>
              <MenuIcon sx={{ color: '#764ba2' }} />
            </IconButton>
          </Stack>
        )}

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={handleMobileDrawerClose}
          PaperProps={{ className: 'mobile-drawer-paper' }}
        >
          <Box className="mobile-drawer-container">
            <Box className="drawer-header">
              <Box>
                <Typography variant="h6" className="drawer-brand">NeighborHelp</Typography>
                <Typography variant="caption" className="drawer-menu-label">Menu</Typography>
              </Box>
              <IconButton 
                onClick={handleMobileDrawerClose}
                className="drawer-close-btn"
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider className="drawer-divider" />

            {/* Main Navigation Links */}
            <List className="drawer-main-list">
              <ListItem 
                button 
                component={Link} 
                to="/"
                onClick={handleMobileDrawerClose}
                className={`drawer-item ${isActive('/') ? 'drawer-item-active' : ''}`}
              >
                <ListItemIcon className="drawer-icon"><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>

              <ListItem 
                button 
                component={Link} 
                to="/about"
                onClick={handleMobileDrawerClose}
                className={`drawer-item ${isActive('/about') ? 'drawer-item-active' : ''}`}
              >
                <ListItemIcon className="drawer-icon"><InfoIcon /></ListItemIcon>
                <ListItemText primary="About Us" />
              </ListItem>

              <ListItem 
                button 
                component={Link} 
                to="/map"
                onClick={handleMobileDrawerClose}
                className={`drawer-item ${isActive('/map') ? 'drawer-item-active' : ''}`}
              >
                <ListItemIcon className="drawer-icon"><MapIcon /></ListItemIcon>
                <ListItemText primary="Find Help" />
              </ListItem>

              <ListItem 
                button 
                component={Link} 
                to="/success-stories"
                onClick={handleMobileDrawerClose}
                className={`drawer-item ${isActive('/success-stories') ? 'drawer-item-active' : ''}`}
              >
                <ListItemIcon className="drawer-icon"><StoriesIcon /></ListItemIcon>
                <ListItemText primary="Success Stories" />
              </ListItem>

              <ListItem 
                button 
                component={Link} 
                to="/safety-guide"
                onClick={handleMobileDrawerClose}
                className={`drawer-item ${isActive('/safety-guide') ? 'drawer-item-active' : ''}`}
              >
                <ListItemIcon className="drawer-icon"><ShieldIcon /></ListItemIcon>
                <ListItemText primary="Safety Guide" />
              </ListItem>

              <ListItem 
                button 
                component={Link} 
                to="/contact"
                onClick={handleMobileDrawerClose}
                className={`drawer-item ${isActive('/contact') ? 'drawer-item-active' : ''}`}
              >
                <ListItemIcon className="drawer-icon"><PhoneIcon /></ListItemIcon>
                <ListItemText primary="Contact Us" />
              </ListItem>

              {!user && (
                <>
                  <Divider className="drawer-divider" />
                  <Box className="drawer-auth-buttons">
                    <Button 
                      component={Link} 
                      to="/signin"
                      onClick={handleMobileDrawerClose}
                      fullWidth
                      className="drawer-signin-btn"
                    >
                      Sign In
                    </Button>
                    <Button 
                      component={Link} 
                      to="/signup"
                      onClick={handleMobileDrawerClose}
                      fullWidth
                      className="drawer-signup-btn"
                    >
                      Sign Up
                    </Button>
                  </Box>
                </>
              )}

              {user && (
                <>
                  <ListItem 
                    button 
                    component={Link} 
                    to="/profile"
                    onClick={handleMobileDrawerClose}
                    className="drawer-item"
                  >
                    <ListItemIcon className="drawer-icon"><Person /></ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>

                  <ListItem 
                    button 
                    onClick={() => {
                      handleLogout();
                      handleMobileDrawerClose();
                    }}
                    className="drawer-item drawer-logout"
                  >
                    <ListItemIcon className="drawer-icon"><Logout /></ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </>
              )}
            </List>

            {/* Footer Links */}
            <Box className="drawer-footer">
              <Box className="drawer-footer-content">
                <Link to="/privacy-policy" onClick={handleMobileDrawerClose} className="footer-link">
                  Privacy Policy
                </Link>
                <span className="footer-divider">•</span>
                <Link to="/terms" onClick={handleMobileDrawerClose} className="footer-link">
                  Terms of Use
                </Link>
              </Box>
            </Box>
          </Box>
        </Drawer>

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