import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// ফর্মের জন্য আইকন
import { FaHeading, FaPhoneAlt, FaListUl, FaInfoCircle, FaMapMarkerAlt } from 'react-icons/fa';
import './MapPage.css'; // নতুন CSS ফাইল

// --- ক্যাটাগরি অনুযায়ী ম্যাপ আইকন জেনারেটর ---
const getCategoryIcon = (category) => {
  let iconUrl = '';

  // ইন্টারনেটের ওপেন সোর্স আইকন ব্যবহার করছি
  switch (category) {
    case 'Emergency':
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';
      break;
    case 'Tools':
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png';
      break;
    case 'Food':
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png';
      break;
    case 'Lost & Found':
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png';
      break;
    default:
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png';
  }

  return L.icon({
    iconUrl: iconUrl,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // এনিমেটেড মেসেজের জন্য
  
  // ফর্ম স্টেট
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    contact: '', 
    category: 'Emergency' 
  });
  const [consent, setConsent] = useState(false); // সম্মতি চেকবক্স

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => alert("Location needed!")
      );
    }
  }, []);

  useEffect(() => {
    if (location) {
      axios.get(`http://neighbor-help-mern.onrender.com/api/posts/nearby?lat=${location.lat}&lng=${location.lng}`)
        .then((res) => setPosts(res.data))
        .catch((err) => console.error(err));
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) return;
    if (!consent) return alert("Please accept the privacy policy.");

    try {
      const res = await axios.post('https://neighbor-help-mern.onrender.com/api/posts/create', { ...formData, lat: location.lat, lng: location.lng });
      setPosts([...posts, res.data]);
      
      // সাকসেস এনিমেশন হ্যান্ডলিং
      setShowForm(false);
      setShowSuccess(true);
      setFormData({ title: '', description: '', contact: '', category: 'Emergency' });
      setConsent(false);

      // ৩ সেকেন্ড পর মেসেজ গায়েব হবে
      setTimeout(() => setShowSuccess(false), 3000);

    } catch (error) {
      console.error(error);
      alert("Error posting request");
    }
  };

  if (!location) return <div className="loading-screen"><h2>📍 Locating you...</h2></div>;

  return (
    <div className="map-page-container">
      
      {/* অ্যানিমেটেড সাকসেস পপআপ */}
      {showSuccess && (
        <div className="success-popup">
          ✅ Request Posted Successfully!
        </div>
      )}

      <MapContainer center={[location.lat, location.lng]} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
        
        {/* ইউজার লোকেশন */}
        <Marker position={[location.lat, location.lng]}>
          <Popup><b>You are here!</b> 🏠</Popup>
        </Marker>

        {/* ডাটাবেস পোস্ট (ক্যাটাগরি অনুযায়ী কালার) */}
        {posts.map((post) => (
          <Marker 
            key={post._id} 
            position={[post.location.coordinates[1], post.location.coordinates[0]]}
            icon={getCategoryIcon(post.category)} // ডাইনামিক আইকন
          >
            <Popup>
              <div className="popup-content">
                <h3>{post.title}</h3>
                <p><strong>Desc:</strong> {post.description}</p>
                <p><strong>Category:</strong> {post.category}</p>
                <p><strong>📞 Contact:</strong> {post.contact}</p>
                <hr/>
                <small>Lat: {post.location.coordinates[1].toFixed(4)}</small><br/>
                <small>Lng: {post.location.coordinates[0].toFixed(4)}</small>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <button className="fab-btn" onClick={() => setShowForm(true)}>
        + Request Help
      </button>

      {/* --- মডার্ন ফর্ম --- */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>📢 Create Request</h2>
            <form onSubmit={handleSubmit}>
              
              <div className="input-group">
                <FaHeading className="icon"/>
                <input type="text" placeholder="Title (e.g. Need Water)" required 
                  value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>

              <div className="input-group">
                <FaInfoCircle className="icon"/>
                <textarea placeholder="Description" required rows="2"
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="input-group">
                <FaListUl className="icon"/>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="Emergency">🚨 Emergency</option>
                  <option value="Tools">🔧 Tools</option>
                  <option value="Food">🍔 Food</option>
                  <option value="Lost & Found">🐱 Lost & Found</option>
                </select>
              </div>

              <div className="input-group">
                <FaPhoneAlt className="icon"/>
                <input type="text" placeholder="Contact Info (Phone/Email)" required 
                  value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} />
              </div>

              {/* সম্মতি চেকবক্স */}
              <div className="consent-box">
                <input type="checkbox" id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <label htmlFor="consent">
                  I agree to share my <FaMapMarkerAlt/> location & accept the <a href="#" style={{color: '#ff4757'}}>Privacy Policy</a>.
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="post-btn">Post Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;