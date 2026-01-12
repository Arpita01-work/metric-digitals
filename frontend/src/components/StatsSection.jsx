import React from 'react';
import { Button } from "../components/ui/button";
import { ChevronRight, TrendingUp } from "lucide-react";
// Import the custom CSS file
import '../styles/StatsSection.css'; 

const stats = [
  { value: "3K+", label: "Successful Project", icon: "📊" },
  { value: "20K", label: "Experienced Users", icon: "👥" },
  { value: "43K+", label: "Happy Customers", icon: "😊" },
  { value: "36K+", label: "Client 5 Star Reviews", icon: "⭐" },
];

export default function StatsSection() {
  // Define progress data separately for clarity
  const progressData = [
    { label: "SEO ANALYSIS", percentage: 90 },
    { label: "MARKETING STRATEGY", percentage: 80 },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {/* Left Content */}
          <div className="content-left">
            <span className="welcome-badge">
              WELCOME TO SEO AGENCY
            </span>
            
            <h2 className="content-title">
              All-in-One SEO & Digital
              <br />
              Marketing Solutions
            </h2>
            
            <p className="content-subtitle">
              Marketing Solutions! Our SEO services ensure your website ranks higher on search engine like Google. 
              Attract more visitors, attract more organic traffic. Plus, we enhance your online presence on every social platform.
            </p>
            
            {/* Progress Bars */}
            <div className="progress-bar-group">
              {progressData.map((progress, index) => (
                <div key={index}>
                  <div className="progress-labels">
                    <span className="progress-label">{progress.label}</span>
                    <span className="progress-percentage">{progress.percentage}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    {/* The width is now set via a custom CSS variable, not inline style */}
                    <div 
                      className="progress-bar-fill" 
                      style={{ '--progress-width': `${progress.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="cta-button group">
              Get A Quote
              <ChevronRight className="button-icon" />
            </Button>
          </div>
          
          {/* Right Content - Stats */}
          <div className="content-right-stats">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="stat-card group"
              >
                <div className="stat-card-decoration"></div>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <TrendingUp className="stat-trend-icon" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}