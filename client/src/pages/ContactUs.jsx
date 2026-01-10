import React, { useState } from 'react';
import Footer from '../components/Footer'; // ১. Footer ইমপোর্ট করা হলো
import './ContactUs.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thank you for contacting us!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      {/* মেইন কন্টেন্ট র‍্যাপার */}
      <div className="contact-wrapper">
        {/* --- Top Section --- */}
        <div className="contact-header">
          <h4>Get In Touch</h4>
          <h1>Let's Connect Together</h1>
          <p>
            Have a question about NeighborHelp? Want to share feedback or report an issue? 
            We'd love to hear from you. Get in touch with our support team and we'll respond as quickly as possible.
          </p>
        </div>

        {/* --- Main Content (Info & Form) --- */}
        <div className="contact-container">
          
          {/* Left Side: Contact Info */}
          <div className="contact-info">
            <div className="info-box">
              <div className="icon-bg"><FaEnvelope /></div>
              <div className="info-text">
                <h3>Email Us</h3>
                <p>support@neighborhelp.com</p>
                <span>24/7 Support Response</span>
              </div>
            </div>

            <div className="info-box">
              <div className="icon-bg"><FaPhoneAlt /></div>
              <div className="info-text">
                <h3>Call Us</h3>
                <p>+91 1234-567890</p>
                <span>Monday - Friday, 9AM-6PM</span>
              </div>
            </div>

            <div className="info-box">
              <div className="icon-bg"><FaMapMarkerAlt /></div>
              <div className="info-text">
                <h3>Visit Us</h3>
                <p>Ecospace,Kolkata,700156</p>
                {/* <span>Headquarters Location</span> */}
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <h2>Send a Message</h2>
              
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Your Full Name" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Your Email Address" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="Topic of discussion" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Write your message here..." 
                  rows="5" 
                  required 
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>

        {/* --- Bottom Section: Social Media --- */}
        <div className="social-media-section">
          <h3>Follow Us On Social Media</h3>
          <div className="social-icons">
            <a href="https://facebook.com" className="social-icon facebook"><FaFacebook /></a>
            <a href="https://twitter.com" className="social-icon twitter"><FaTwitter /></a>
            <a href="https://instagram.com" className="social-icon instagram"><FaInstagram /></a>
            <a href="https://linkedin.com" className="social-icon linkedin"><FaLinkedin /></a>
            <a href="https://youtube.com" className="social-icon youtube"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* ২. ফুটার এখানে যুক্ত করা হয়েছে (wrapper এর বাইরে) */}
      <Footer />
    </>
  );
};

export default ContactUs;