import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import "../styles/Header.css";

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
          <Link to="/" className="header-logo-group">
            <div className="logo-icon-wrapper">
              <span className="logo-icon-text">M</span>
            </div>
            <span className="logo-text">Metric</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <Link key={item.name} to={item.to} className="nav-link">
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="desktop-cta">
            <Button className="cta-button">Get A Quote</Button>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu-dropdown">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
