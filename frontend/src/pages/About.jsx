// src/pages/About.jsx
import React from "react";
import { Button } from "../components/ui/button";
import { ArrowRight, Users, Award, Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import "../styles/About.css";

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Emily Davis",
    role: "SEO Specialist",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "David Wilson",
    role: "Content Strategist",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces",
  },
];

const values = [
  {
    icon: Target,
    title: "Result-Driven",
    description:
      "We focus on delivering measurable results that impact your bottom line.",
  },
  {
    icon: Users,
    title: "Client-Focused",
    description:
      "Your success is our priority. We work closely with you to achieve your goals.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from strategy to execution.",
  },
];

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-container">
          <div className="about-hero-grid">
            <div className="about-hero-content">
              <span className="about-section-tag">ABOUT US</span>
              <h1 className="about-hero-title">
                We Help Businesses Grow Online
              </h1>
              <p className="about-hero-text">
                Founded in 2015, VinoMa has been at the forefront of digital
                marketing innovation. Our team of experts combines creativity
                with data-driven strategies to deliver exceptional results for
                our clients.
              </p>

              <div className="about-hero-highlights">
                {[
                  "10+ Years of Experience",
                  "500+ Successful Projects",
                  "50+ Expert Team Members",
                ].map((item, i) => (
                  <div key={i} className="about-hero-highlight-item">
                    <CheckCircle className="about-hero-highlight-icon" />
                    <span className="about-hero-highlight-text">{item}</span>
                  </div>
                ))}
              </div>

              <Link to={createPageUrl("Contact")}>
                <Button className="about-hero-cta">
                  <span>Get Started</span>
                  <ArrowRight className="about-hero-cta-icon" />
                </Button>
              </Link>
            </div>

            <div className="about-hero-image-wrapper">
              <div className="about-hero-image-card">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop"
                  alt="Team working together"
                  className="about-hero-image"
                />
              </div>
              <div className="about-hero-experience">
                <div className="about-hero-experience-value">10+</div>
                <div className="about-hero-experience-label">
                  Years Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="about-container">
          <div className="about-section-header">
            <span className="about-section-tag">OUR VALUES</span>
            <h2 className="about-section-title">What Drives Us Forward</h2>
          </div>

          <div className="about-values-grid">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="about-value-card">
                  <div className="about-value-icon-wrapper">
                    <Icon className="about-value-icon" />
                  </div>
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-value-text">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="about-container">
          <div className="about-section-header">
            <span className="about-section-tag">OUR TEAM</span>
            <h2 className="about-section-title">Meet The Experts</h2>
          </div>

          <div className="about-team-grid">
            {team.map((member, index) => (
              <div key={index} className="about-team-member">
                <div className="about-team-image-wrapper">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="about-team-image"
                  />
                  <div className="about-team-image-overlay" />
                </div>
                <h3 className="about-team-name">{member.name}</h3>
                <p className="about-team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
