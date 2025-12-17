import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.heroBox}>
        <h1 style={styles.title}>NeighborHelp 🤝</h1>
        <p style={styles.tagline}>
          Connect with your local community instantly.<br/> 
          Find help or be a hero for someone nearby.
        </p>
        
        {/* ম্যাপ পেজে যাওয়ার বাটন */}
        <Link to="/map" style={styles.button}>
          🌍 Find Help Nearby
        </Link>
      </div>
      
      <footer style={styles.footer}>
        <p>&copy; 2025 NeighborHelp. Built for Community.</p>
      </footer>
    </div>
  );
};

// সাধারণ ইনলাইন স্টাইল (CSS)
const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // সুন্দর ব্যাকগ্রাউন্ড কালার
    color: 'white',
    fontFamily: 'Arial, sans-serif'
  },
  heroBox: {
    textAlign: 'center',
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.1)', // গ্লাস ইফেক্ট
    borderRadius: '15px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(4px)',
    maxWidth: '600px',
    margin: '20px'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '10px',
    marginTop: 0
  },
  tagline: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    lineHeight: '1.6'
  },
  button: {
    display: 'inline-block',
    padding: '15px 30px',
    fontSize: '1.2rem',
    color: '#764ba2',
    backgroundColor: 'white',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: 'bold',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  footer: {
    position: 'absolute',
    bottom: '20px',
    fontSize: '0.9rem',
    opacity: 0.8
  }
};

export default Home;