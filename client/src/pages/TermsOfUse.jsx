import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gavel, CheckCircle, Warning, Block, Assignment, Shield } from '@mui/icons-material';
import Footer from '../components/Footer';
import './TermsOfUse.css'; // CSS ইমপোর্ট

const TermsOfUse = () => {
  // পেজ লোড হলে একদম উপরে স্ক্রল করবে
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const termsSections = [
    {
      title: "Acceptance of Terms",
      icon: <Assignment />,
      content: "By accessing and using NeighborHelp, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these terms, you must discontinue use of our service immediately."
    },
    {
      title: "Community Guidelines",
      icon: <CheckCircle style={{ color: '#38a169' }} />, // সবুজ কালার ম্যানুয়ালি
      content: "NeighborHelp is built on trust. You agree to treat all neighbors with respect. Harassment, hate speech, discrimination, or any form of abusive behavior will not be tolerated and may result in immediate account suspension."
    },
    {
      title: "User Responsibilities",
      icon: <Shield />,
      content: "You are responsible for maintaining the confidentiality of your account credentials. All activities that occur under your account are your responsibility. Please report any unauthorized use of your account immediately."
    },
    {
      title: "Prohibited Activities",
      icon: <Block style={{ color: '#e53e3e' }} />, // লাল কালার ম্যানুয়ালি
      content: "Users may not use the platform for illegal activities, spamming, distributing malware, or collecting user data without consent. Fake help requests or misuse of the emergency alert system is strictly prohibited."
    },
    {
      title: "Safety & Liability",
      icon: <Warning style={{ color: '#dd6b20' }} />, // অরেঞ্জ কালার ম্যানুয়ালি
      content: "While we strive to verify users, NeighborHelp cannot guarantee the true identity or intentions of any user. Interactions with others are at your own risk. We are not liable for any damages arising from your use of the platform."
    }
  ];

  return (
    <>
      <div className="terms-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="terms-card">
            
            {/* Header Section */}
            <div className="terms-header">
              <Gavel className="terms-header-icon" />
              <h1 className="terms-title">Terms of Use</h1>
              <p className="terms-description">
                Please read these terms carefully before using our platform.
              </p>
              <span className="terms-date">Last Updated: January 2026</span>
            </div>

            <hr className="terms-divider" />

            {/* Terms List */}
            <div className="terms-list">
              {termsSections.map((section, index) => (
                <div key={index} className="terms-item">
                  <div className="terms-icon-box">
                    {section.icon}
                  </div>
                  <div className="terms-content">
                    <h4>{index + 1}. {section.title}</h4>
                    <p>{section.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer Box */}
            <div className="disclaimer-box">
              <h5 className="disclaimer-title">Disclaimer</h5>
              <p className="disclaimer-text">
                NeighborHelp is a community platform. We do not employ the helpers and are not responsible for their actions. In case of a real emergency, please call your local emergency number (e.g., 999) immediately instead of posting here.
              </p>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Footer Import */}
      <Footer />
    </>
  );
};

export default TermsOfUse;