import React from 'react';
import { ChevronRight, TrendingUp, Search, Layers, Mail, Megaphone, Gauge } from "lucide-react";
import { Button } from "../components/ui/button";
// Import the custom CSS file
import '../styles/Services.css';

// Data for the service cards
const marketingServices = [
  {
    icon: Search,
    title: "Search Engine Optimization (SEO)",
    description: "Achieve top rankings on Google. We optimize your website structure, content, and authority to drive high-quality organic traffic and visibility.",
    results: "+150% Organic Traffic"
  },
  {
    icon: Layers,
    title: "Website & UX Design",
    description: "Building modern, fast, and mobile-responsive websites focused on converting visitors into leads. Excellent user experience (UX) guaranteed.",
    results: "99% Mobile Score"
  },
  {
    icon: Megaphone,
    title: "Paid Advertising (PPC)",
    description: "Maximize your ROI with targeted campaigns on Google Ads and social platforms. We handle everything from keyword research to conversion tracking.",
    results: "+25% Lead Conversion"
  },
  {
    icon: Mail,
    title: "Email Marketing Automation",
    description: "Nurture your leads and retain customers using sophisticated email funnels and personalized campaigns. Drive repeat business efficiently.",
    results: "35% Open Rate"
  },
  {
    icon: TrendingUp,
    title: "Social Media Strategy",
    description: "Develop a cohesive social media presence across platforms (Meta, LinkedIn, X). Engage your audience, build brand loyalty, and drive referrals.",
    results: "10K Engaged Followers"
  },
  {
    icon: Gauge,
    title: "Analytics & Reporting",
    description: "We provide transparent, detailed reports and use data-driven insights to continuously refine strategies, ensuring optimal performance and growth.",
    results: "Monthly Growth Reports"
  },
];

export default function Services() {
  return (
    <div className="services-page">
      <section className="services-hero-section">
        <div className="services-container">
          <div className="services-hero-content">
            <span className="services-tag">OUR EXPERTISE</span>
            <h1 className="services-title">
              Comprehensive Digital Marketing Services
            </h1>
            <p className="services-subtitle">
              We offer a full spectrum of data-driven strategies designed to elevate your brand, capture more market share, and deliver measurable results.
            </p>
          </div>
        </div>
      </section>

      <section className="services-grid-section">
        <div className="services-container">
          <div className="services-grid">
            {marketingServices.map((service, index) => (
              <div key={index} className="service-card group">
                <div className="service-icon-wrapper">
                  <service.icon className="service-icon" />
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-description">{service.description}</p>
                <div className="service-results">
                  <div className="result-dot"></div>
                  <span className="result-text">{service.results}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Reusing the design pattern */}
      <section className="services-cta-section">
        <div className="services-container services-cta-content">
          <h2 className="cta-title">Ready to Transform Your Digital Presence?</h2>
          <p className="cta-text">
            Let's discuss your goals and build a custom strategy that drives real business growth. Contact us today for a free consultation.
          </p>
          <Button className="cta-button">
            Start Your Project Today
            <ChevronRight className="cta-button-icon" />
          </Button>
        </div>
      </section>
    </div>
  );
}