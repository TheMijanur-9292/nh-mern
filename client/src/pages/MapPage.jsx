import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../pages/MapPage.css'; // আপনার আপডেট করা CSS ফাইল
import L from 'leaflet';
import axios from 'axios';
import { Box, CircularProgress, Stack, Fab, Tooltip } from '@mui/material';
import { MyLocation, AddAlert } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

// Components
import FilterBar from '../components/FilterBar';
import RequestForm from '../components/RequestForm';
import MapHelpCard from '../components/MapHelpCard';

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7); transform: scale(1); }
  70% { box-shadow: 0 0 0 20px rgba(255, 71, 87, 0); transform: scale(1.1); }
  100% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); transform: scale(1); }
`;

// ১. ফিল্টার বারের আইকন এবং CSS ক্লাস ব্যবহার করে মার্কার
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

// ২. ইউজারের নিজের লোকেশন মার্কার (CSS ক্লাস: user-location-dot)
const userLocationIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="user-location-dot"></div>`,
  iconSize: [15, 15]
});

// ৩. ১০০ মিটার র‍্যান্ডম অফসেট লজিক
const applyRandomOffset = (location) => {
  if (!location) return null;
  const offset = 0.0009; 
  return {
    lat: location.lat + (Math.random() - 0.5) * offset,
    lng: location.lng + (Math.random() - 0.5) * offset
  };
};

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.flyTo([lat, lng], 15);
  }, [lat, lng, map]);
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

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const parsed = JSON.parse(loggedInUser);
      setUser({ ...parsed, id: parsed.id || parsed._id });
    }
    fetchPosts();
    handleGetCurrentLocation();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts');
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.log("Location Access Denied")
      );
    }
  };

  const filteredPosts = posts.filter(p => filter === 'All' ? true : p.category === filter);

  return (
    <Box sx={{ height: 'calc(100vh - 70px)', width: '100%', position: 'relative' }}>
      <FilterBar filter={filter} setFilter={setFilter} posts={posts} />

      <RequestForm 
        open={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        currentLocation={applyRandomOffset(currentLocation)}
        refreshPosts={fetchPosts} 
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <MapContainer 
          center={currentLocation ? [currentLocation.lat, currentLocation.lng] : [23.81, 90.41]} 
          zoom={14} 
          style={{ height: "100%" }} 
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {currentLocation && (
            <Marker position={[currentLocation.lat, currentLocation.lng]} icon={userLocationIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}

          {currentLocation && <RecenterAutomatically lat={currentLocation.lat} lng={currentLocation.lng} />}
          
          {filteredPosts.map((post) => (
            post.location && (
              <Marker key={post._id} position={[post.location.lat, post.location.lng]} icon={getMarkerIcon(post.category)}>
                <Popup>
                  <MapHelpCard 
                    post={post} 
                    currentUser={user} 
                    onMessageClick={(id, name) => navigate(`/messages/${id}?name=${name}`)}
                  />
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      )}

      {/* Floating Action Buttons */}
      <Stack direction="column" spacing={2} sx={{ position: 'absolute', bottom: 30, right: 20, zIndex: 1000, alignItems: 'center' }}>
        
        <Tooltip title="Go to My Location" placement="left">
          <Fab onClick={handleGetCurrentLocation} size="medium" sx={{ bgcolor: 'white', color: '#1e90ff', '&:hover': { bgcolor: '#f0f0f0' } }}>
            <MyLocation />
          </Fab>
        </Tooltip>

        <Fab 
          variant="extended" 
          color="error" 
          onClick={() => user ? setIsFormOpen(true) : navigate('/signin')}
          sx={{ animation: `${pulseAnimation} 2s infinite`, textTransform: 'none', fontWeight: 'bold', px: 3 }}
        >
          <AddAlert sx={{ mr: 1 }} /> Request Help
        </Fab>
      </Stack>
    </Box>
  );
};

export default MapPage;