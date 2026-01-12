import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
// Import the custom CSS file
import '../styles/Footer.css'; 

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Company Info */}
          <div className="footer-section company-info">
            <div className="footer-logo-group">
              <div className="logo-icon-wrapper">
                <span className="logo-icon-text">V</span>
              </div>
              <span className="logo-text">VinoMa</span>
            </div>
            <p className="company-description">
              Unlock the power of SEO to drive growth, boost visibility, and achieve lasting success with our expert strategies.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon-link">
                <Facebook className="social-icon" />
              </a>
              <a href="#" className="social-icon-link">
                <Twitter className="social-icon" />
              </a>
              <a href="#" className="social-icon-link">
                <Instagram className="social-icon" />
              </a>
              <a href="#" className="social-icon-link">
                <Linkedin className="social-icon" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              {["About Us", "Services", "Portfolio", "Blog", "Contact"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-list">
              {["SEO Optimization", "Content Marketing", "Social Media", "Email Marketing", "PPC Campaigns"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter / Contact */}
          <div className="footer-section">
            <h3 className="footer-heading">Newsletter</h3>
            <p className="newsletter-text">
              Subscribe to get the latest news and updates.
            </p>
            <div className="newsletter-form">
              <Input 
                placeholder="Your email" 
                className="newsletter-input"
              />
              <Button className="subscribe-button">
                <Mail className="subscribe-icon" />
              </Button>
            </div>
            
            <div className="contact-info-group">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>info@vinoma.com</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>123 Business Ave, NYC</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© 2024 VinoMa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}