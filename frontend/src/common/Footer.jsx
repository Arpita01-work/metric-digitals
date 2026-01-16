import React, { useState } from "react"; // ✅ CHANGED
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
// Import the custom CSS file
import '../styles/Footer.css'; 

export default function Footer() {
    // ✅ NEW STATE
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ NEW HANDLER
  const handleNewsletterSubscribe = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newsletterEmail }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("SERVER RESPONSE:", errorText);
      throw new Error("Request failed");
    }

    const data = await res.json();
    alert("Subscribed successfully! Check your email 📧");
    setNewsletterEmail("");
  } catch (err) {
    console.error(err);
    alert("Subscription failed");
  }
};

  

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Company Info */}
          <div className="footer-section company-info">
            <div className="footer-logo-group">
              <div className="logo-icon-wrapper">
                <span className="logo-icon-text">M</span>
              </div>
              <span className="logo-text">Metric</span>
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
              <li>
                <Link to="/about" className="footer-link">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">Services</Link>
              </li>
              <li>
                <Link to="/blog" className="footer-link">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-list">
              <li>
                <Link to="/contactform" className="footer-link">SEO Optimization</Link>
              </li>
              <li>
                <Link to="/contactform" className="footer-link">Content Marketing</Link>
              </li>
              <li>
                <Link to="/contactform" className="footer-link">Social Media</Link>
              </li>
              <li>
                <Link to="/contactform" className="footer-link">Email Marketing</Link>
              </li>
              <li>
                <Link to="/contactform" className="footer-link">PPC Campaigns</Link>
              </li>
            </ul>
          </div>
          {/* Newsletter / Contact */}
          <div className="footer-section">
            <h3 className="footer-heading">Newsletter</h3>
            <p className="newsletter-text">
              Subscribe to get the latest news and updates.
            </p>

            {/* ✅ CONNECTED FORM */}
            <form className="newsletter-form" onSubmit={handleNewsletterSubscribe}>
              <Input
                placeholder="Your email"
                className="newsletter-input"
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="subscribe-button"
                disabled={loading}
              >
                <Mail className="subscribe-icon" />
              </Button>
            </form>

            
            <div className="contact-info-group">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>info@metric.com</span>
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
          <p>© 2024 Metric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}