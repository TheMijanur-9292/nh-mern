import React, { useState, useEffect, useRef } from 'react';
import { 
  LocalPharmacy, ShoppingCart, DirectionsCar, 
  Bloodtype, Build, Pets, ReportProblem, Fastfood, Search 
} from '@mui/icons-material';
import './Categories.css';

const categories = [
  { name: "Emergency", icon: <ReportProblem fontSize="large" />, color: "#ff4757" },
  { name: "Medical", icon: <LocalPharmacy fontSize="large" />, color: "#1e90ff" },
  { name: "Groceries", icon: <ShoppingCart fontSize="large" />, color: "#2ed573" },
  { name: "Food", icon: <Fastfood fontSize="large" />, color: "#ffa502" },
  { name: "Lost & Found", icon: <Search fontSize="large" />, color: "#a29bfe" },
  { name: "Transport", icon: <DirectionsCar fontSize="large" />, color: "#747d8c" },
  { name: "Blood", icon: <Bloodtype fontSize="large" />, color: "#ff6b81" },
  { name: "Repairs", icon: <Build fontSize="large" />, color: "#5352ed" },
  { name: "Pet Care", icon: <Pets fontSize="large" />, color: "#eccc68" },
];

const Categories = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll logic (Left to Right)
  useEffect(() => {
    const slider = scrollRef.current;
    let animationFrameId;

    const scroll = () => {
      if (!isDragging && slider) {
        slider.scrollLeft -= 1; // Left to Right movement
        if (slider.scrollLeft <= 0) {
          slider.scrollLeft = slider.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]);

  // Manual Drag/Scroll Logic
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll sensitivity
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  // Infinite effect er jonno array double
  const extendedCategories = [...categories, ...categories];

  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="categories-title">What do you need help with?</h2>
        
        <div className="categories-wrapper">
          <div 
            className={`categories-grid ${isDragging ? 'dragging' : ''}`}
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {extendedCategories.map((cat, index) => (
              <div 
                key={index} 
                className="category-card" 
                style={{ '--accent-color': cat.color }}
              >
                <div className="icon-box" style={{ color: cat.color }}>
                  {cat.icon}
                </div>
                <span className="category-name">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;