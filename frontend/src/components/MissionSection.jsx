// src/components/MissionSection.jsx
import React from "react";
import "../styles/MissionSection.css";

export default function MissionSection() {
  return (
    <section className="mission">
      <div className="mission-container">
        {/* Section Header */}
        <div className="mission-header">
          <span className="mission-tag">OUR MISSION & VISION</span>
          <h2 className="mission-title">
            Innovative SEO Strategies for Maximum Impact
          </h2>
        </div>

        {/* Content Grid */}
        <div className="mission-grid">
          {/* Mission */}
          <div className="mission-card">
            <span className="mission-label">OUR MISSION</span>
            <h3 className="mission-card-title">
              Dedicated to Customer Excellence
            </h3>
            <p className="mission-text">
              Our mission is to empower businesses by delivering SEO solutions
              that are not only effective but sustainable. We work with our
              clients to deliver results that exceed expectations and drive
              real, long-term growth.
            </p>
          </div>

          {/* Center Image */}
          <div className="mission-image-wrapper">
            <div className="mission-image-card">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces"
                alt="Team Member"
                className="mission-image"
              />
            </div>

            <div className="mission-dots">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="mission-dot" />
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="mission-card">
            <span className="mission-label">OUR VISION</span>
            <h3 className="mission-card-title">
              Striving for Industry Leadership
            </h3>
            <p className="mission-text">
              We help you build and maintain a strong presence on platforms like
              Facebook, Instagram, LinkedIn, and Twitter. We engage your
              audience, foster brand loyalty, and drive conversions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
