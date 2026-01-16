import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import '../styles/HeroSection.css'; 

export default function HeroSection() {
    const [open, setOpen] = useState(false); 
    const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-grid">
          {/* Left Content */}
          <div className="hero-content">
            <div className="badge-container">
              <span className="badge-dot"></span>
              MARKETING AGENCY
            </div>
            
            <h1 className="hero-title">
              Boost Your Growth
              <br />
              with Smart SEO
              <br />
              Strategies
            </h1>
            
            <p className="hero-subtitle">
              Unlock the power of SEO to drive growth, boost visibility, and achieve lasting success.
            </p>
            
            <div className="hero-actions">
              <Button className="primary-button group" onClick={() => navigate("/contactform")}>
                Get Started Now
                <ChevronRight className="button-icon" />
              </Button>
              <Button variant="ghost" className="secondary-button"
              onClick = {() => navigate("/about")}>
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="hero-image-wrapper">
            {/* Main Image Container */}
            <div className="image-main-container">
              {/* Orange decorative shape behind */}
              <div className="decorative-shape"></div>
              
              {/* Image wrapper with curved border */}
              <div className="image-card">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=500&fit=crop&crop=faces"
                  alt="Professional woman with laptop"
                  className="hero-image"
                />
                
                {/* Rating Badge */}
                <div className="rating-badge">
                  <div className="rating-content">
                    <span className="rating-score">4.9</span>
                    <div className="rating-stars-container">
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="star-icon" />
                        ))}
                      </div>
                      <span className="review-count">2.5k reviews</span>
                    </div>
                  </div>
                </div>
                
                {/* Name Badge */}
                <div className="name-badge">
                  <span className="name-text">Phoenix Baker</span>
                </div>
              </div>
              
              {/* Decorative dots */}
              <div className="decorative-dots-container">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="dot"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave decoration at bottom */}
      <div className="wave-decoration">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* The fill color and opacity for the path are preserved via hex/opacity */}
          <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" fill="#FED7AA" fillOpacity="0.3"/>
        </svg>
      </div>
    </section>
  );
}