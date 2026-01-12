import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
// Import the custom CSS file
import '../styles/Header.css'; 

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Portfolios", href: "/portfolios", hasDropdown: true },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
  { name: "Services", href: "/services"},
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
              <span className="logo-icon-text">V</span>
            </div>
            <span className="logo-text">VinoMa</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                className="nav-link"
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="dropdown-icon" />}
              </a>
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
              <a 
                key={index}
                href={item.href}
                className="mobile-nav-link"
              >
                {item.name}
              </a>
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