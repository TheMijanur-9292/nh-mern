import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>🤝 NeighborHelp</Link>
      </div>
      <div style={styles.menu}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/map" style={styles.btnLink}>Find Help</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#333',
    color: 'white',
    height: '60px', // হাইট ফিক্সড রাখলাম যাতে ম্যাপের সাইজ ঠিক করা যায়
    boxSizing: 'border-box'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  menu: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  btnLink: {
    backgroundColor: '#ff4757',
    padding: '8px 15px',
    borderRadius: '5px',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default Navbar;