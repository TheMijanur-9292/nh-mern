import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} NeighborHelp. Connecting Communities.</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#222',
    color: '#aaa',
    fontSize: '0.9rem',
    // ফুটার যাতে ম্যাপের ওপর সমস্যা না করে, তাই হোম পেজেই মূলত দেখাব
  }
};

export default Footer;