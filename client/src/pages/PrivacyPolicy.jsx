import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Security, Lock, VisibilityOff, GppGood } from '@mui/icons-material';
import Footer from '../components/Footer';
import './PrivacyPolicy.css'; // CSS ফাইল ইমপোর্ট

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: <Lock fontSize="medium" />,
      title: "Data Protection",
      desc: "Your personal information (Name, Email, Password) is encrypted and stored securely. We never share your credentials with third parties."
    },
    {
      icon: <VisibilityOff fontSize="medium" />,
      title: "Location Privacy",
      desc: "We use your location only to show nearby help requests. For your safety, we add a slight random offset to your exact pin location on the map."
    },
    {
      icon: <Security fontSize="medium" />,
      title: "Chat Encryption",
      desc: "Your conversations with other neighbors are private and encrypted. NeighborHelp staff cannot read your personal messages."
    },
    {
      icon: <GppGood fontSize="medium" />,
      title: "User Control",
      desc: "You have full control over your data. You can delete your posts or request to deactivate your account at any time."
    }
  ];

  return (
    <>
      <div className="privacy-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="privacy-card">
            
            {/* Header */}
            <div className="privacy-header">
              <Security className="header-icon" style={{ fontSize: '50px' }} />
              <h1 className="privacy-title">Privacy Policy</h1>
              <span className="privacy-date">Last updated: January 2026</span>
            </div>

            <p className="privacy-intro">
              At NeighborHelp, we take your privacy seriously. This policy outlines how we handle your data to provide a safe and helpful environment for the community.
            </p>

            <hr className="divider-line" />

            {/* Sections */}
            <div className="policy-list">
              {sections.map((section, index) => (
                <div key={index} className="policy-item">
                  <div className="icon-box">
                    {section.icon}
                  </div>
                  <div className="policy-content">
                    <h4>{section.title}</h4>
                    <p>{section.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Contact Box */}
            <div className="privacy-contact-box">
              <h5>Have questions about your privacy?</h5>
              <p>
                If you have any concerns regarding your data or our security practices, please contact us at privacy@neighborhelp.com.
              </p>
            </div>

          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;