import React from 'react';
import { CheckCircle2 } from "lucide-react";
import '../styles/FeatureSection.css'; 

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">
            OUR MISSION & VISION
          </span>
          <h2 className="section-title">
            Innovative SEO Strategies
            <br />
            for Maximum Impact
          </h2>
        </div>
        
        {/* Feature Cards */}
        <div className="features-grid">
          {/* Customer Excellence Card */}
          <div className="feature-card group">
            <div className="feature-content">
              <div className="feature-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop"
                  alt="Team collaboration"
                  className="feature-image"
                />
              </div>
              <div className="feature-text">
                <span className="feature-badge">OUR MISSION</span>
                <h3 className="feature-heading">
                  Dedicated to Customer Excellence
                </h3>
                <p className="feature-description">
                  Our mission is to empower businesses with innovative SEO solutions that not only attract but sustainably, 
                  achieve top rankings and drive results.
                </p>
              </div>
            </div>
          </div>
          
          {/* Industry Leadership Card */}
          <div className="feature-card group">
            <div className="feature-content">
              <div className="feature-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                  alt="Business meeting"
                  className="feature-image"
                />
              </div>
              <div className="feature-text">
                <span className="feature-badge">OUR VISION</span>
                <h3 className="feature-heading">
                  Striving for Industry Leadership
                </h3>
                <p className="feature-description">
                  We help you build and maintain a strong presence across key platforms: Facebook, Instagram, LinkedIn, 
                  and Twitter to engage your audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}