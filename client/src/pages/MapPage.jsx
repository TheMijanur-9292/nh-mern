import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../pages/MapPage.css'; 
import L from 'leaflet';
import axios from 'axios';
import { Box, CircularProgress, Stack, Fab, Tooltip, Typography, Snackbar, Alert } from '@mui/material';
import { MyLocation, AddAlert, CheckCircleOutline } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

// Components
import FilterBar from '../components/FilterBar';
import RequestForm from '../components/RequestForm';
import MapHelpCard from '../components/MapHelpCard';

// এটি আপনার কোডে অলরেডি আছে, না থাকলে যোগ করুন
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7); transform: scale(1); }
  70% { box-shadow: 0 0 0 20px rgba(255, 71, 87, 0); transform: scale(1.1); }
  100% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); transform: scale(1); }
`;

const getMarkerIcon = (category) => {
  const icons = {
    'Emergency': '🚨', 'Medical': '💊', 'Groceries': '🛒', 'Food': '🍔',
    'Lost & Found': '🔍', 'Transport': '🚗', 'Blood': '🩸', 'Repairs': '🔧', 'Pet Care': '🐾'
  };
  const emoji = icons[category] || '📍';
  const borderColor = category === 'Emergency' ? '#ff4757' : '#764ba2';

  return new L.DivIcon({
    className: 'custom-marker',
    html: `<div class="marker-pin-animated" style="background: white; border: 2px solid ${borderColor}; border-radius: 50%; width: 32px; height: 32px; display: flex; justify-content: center; align-items: center; font-size: 18px;">${emoji}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
};

const userLocationIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="user-location-dot"></div>`,
  iconSize: [15, 15]
});

const MapController = ({ currentLocation, filteredPosts, filter }) => {
  const map = useMap();
  useEffect(() => {
    if (filter !== 'All' && filteredPosts.length > 0) {
      const bounds = L.latLngBounds(filteredPosts.filter(p => p.location?.lat).map(p => [p.location.lat, p.location.lng]));
      if (bounds.isValid()) {
        map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    } else if (currentLocation && filter === 'All') {
      map.flyTo([currentLocation.lat, currentLocation.lng], 14);
    }
  }, [filter, filteredPosts, map, currentLocation]);
  return null;
};

const MapPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [filter, setFilter] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleGetCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLoading(false);
        },
        () => {
          setCurrentLocation({ lat: 23.81, lng: 90.41 });
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser && loggedInUser !== "undefined" && loggedInUser !== "null") {
      try {
        const parsed = JSON.parse(loggedInUser);
        if (parsed) {
          setUser({ 
            ...parsed, 
            id: parsed.id || parsed._id,
            name: parsed.name || "Neighbor" 
          });
        }
      } catch (e) {
        setUser(null);
      }
    }
    fetchPosts();
    handleGetCurrentLocation();
  }, [handleGetCurrentLocation]);

  const fetchPosts = async () => {
    try {
     // const res = await axios.get('http://localhost:5000/api/posts');
     const res = await axios.get(`${API_BASE_URL}/api/posts`); 
     setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.log("Fetch error"); }
  };

  const handleFormSubmit = async (formData) => {
    const uid = user?.id || user?._id;
    if (!uid) {
        setSnackbar({ open: true, message: 'Please sign in to post.', severity: 'error' });
        return;
    }
    if (!currentLocation) {
        setSnackbar({ open: true, message: 'Detecting location... please wait.', severity: 'warning' });
        return;
    }

    const offset = 0.002; 
    const randomLat = currentLocation.lat + (Math.random() - 0.5) * offset;
    const randomLng = currentLocation.lng + (Math.random() - 0.5) * offset;

    try {
      const postData = {
        userId: uid,
        username: user.name || "Neighbor",
        title: formData.title,
        category: formData.category,
        description: formData.description || "No description provided",
        location: {
          lat: Number(randomLat.toFixed(6)), // নিশ্চিত করা হচ্ছে Number ফরম্যাট
          lng: Number(randomLng.toFixed(6))
        },
        contact: "Chat only"
      };

     // const res = await axios.post('http://localhost:5000/api/posts', postData);
     const res = await axios.post(`${API_BASE_URL}/api/posts`, postData); 

      if (res.status === 201 || res.status === 200) {
        setIsFormOpen(false);
        fetchPosts();
        setSnackbar({ open: true, message: 'Help Request Posted Successfully!', severity: 'success' });
      }
    } catch (err) {
      console.error("Post Error:", err.response?.data);
      setSnackbar({ 
        open: true, 
        message: err.response?.data?.message || 'Failed to post. Check console.', 
        severity: 'error' 
      });
    }
  };

  const filteredPosts = posts.filter(p => filter === 'All' ? true : p.category === filter);

  return (
    <Box sx={{ height: 'calc(100vh - 70px)', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <FilterBar filter={filter} setFilter={setFilter} posts={posts} />

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: 3000 }}
      >
        <Alert 
          icon={<CheckCircleOutline fontSize="inherit" />} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%', borderRadius: '12px', fontWeight: 'bold' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {isFormOpen && (
        <Box sx={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          bgcolor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' 
        }}>
          <RequestForm onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />
        </Box>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', bgcolor: '#f0f2f5' }}>
          <Stack alignItems="center" spacing={2}>
            <CircularProgress sx={{ color: '#764ba2' }} />
            <Typography color="text.secondary" fontWeight="600">Locating your neighborhood...</Typography>
          </Stack>
        </Box>
      ) : (
        <MapContainer center={[currentLocation.lat, currentLocation.lng]} zoom={14} style={{ height: "100%" }} zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapController currentLocation={currentLocation} filteredPosts={filteredPosts} filter={filter} />
          {currentLocation && (
            <Marker position={[currentLocation.lat, currentLocation.lng]} icon={userLocationIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}
          {filteredPosts.map((post, index) => (
            post.location?.lat && post.location?.lng && (
              <Marker key={post._id || index} position={[post.location.lat, post.location.lng]} icon={getMarkerIcon(post.category)}>
                <Popup>
                  <MapHelpCard post={post} currentUser={user} onMessageClick={(id, name) => navigate(`/messages/${id}?name=${name}`)} />
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      )}

      <Stack direction="column" spacing={2} sx={{ position: 'absolute', bottom: 30, right: 20, zIndex: 1000 }}>
        <Tooltip title="My Location" placement="left">
          <Fab onClick={handleGetCurrentLocation} size="medium" sx={{ bgcolor: 'white', color: '#764ba2' }}><MyLocation /></Fab>
        </Tooltip>
        <Fab 
          variant="extended" 
          onClick={() => user ? setIsFormOpen(true) : navigate('/signin')}
          sx={{ bgcolor: '#764ba2', color: 'white', '&:hover': { bgcolor: '#5b3a7d' }, animation: `${pulseAnimation} 2s infinite`, fontWeight: 'bold', px: 3 }}
        >
          <AddAlert sx={{ mr: 1 }} /> Request Help
        </Fab>
      </Stack>
    </Box>
  );
};

export default MapPage;