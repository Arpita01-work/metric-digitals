import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
// Import the custom CSS file
import '../styles/Header.css'; 
import { Link } from 'react-router-dom';

const navItems = [
  { name: "Home", to: "/" },
  { name: "Services", to: "/services" },
  { name: "Blog", to: "/blog" },
  { name: "Contact Us", to: "/contact" },
  { name: "About Us", to: "/about" },
];


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="header-logo-group">
            <div className="logo-icon-wrapper">
              <span className="logo-icon-text">M</span>
            </div>
            <span className="logo-text">Metric</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="nav-link"
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="dropdown-icon" />}
              </Link>
            ))}
          </nav>
          
          {/* CTA Button */}
          <div className="desktop-cta">
            <Button className="cta-button">
              Get A Quote
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="toggle-icon" />
            ) : (
              <Menu className="toggle-icon" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-dropdown">
          <div className="mobile-nav-list">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button className="mobile-cta-button">
              Get A Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}