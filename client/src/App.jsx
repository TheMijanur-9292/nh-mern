import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* ফ্লেক্সবক্স দিয়ে পুরো লেআউট সাজানো */}
      <div style={styles.appContainer}>
        
        <Navbar />
        
        {/* মেইন কন্টেন্ট এরিয়া (যতটুকু জায়গা ফাঁকা পাবে নিয়ে নেবে) */}
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </div>

        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // পুরো স্ক্রিন হাইট
    width: '100vw',    // পুরো স্ক্রিন উইডথ
  },
  content: {
    flex: 1, // Navbar ও Footer বাদে বাকি সব জায়গা নেবে
    display: 'flex',
    flexDirection: 'column'
  }
};

export default App;