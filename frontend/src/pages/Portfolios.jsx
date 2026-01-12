// src/pages/Portfolios.jsx
import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import "../styles/Portfolio.css";

const categories = ["All", "SEO", "Web Design", "Marketing", "Branding"];

const projects = [
  {
    title: "E-Commerce SEO Success",
    client: "FashionHub",
    category: "SEO",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    results: "+250% organic traffic",
  },
  {
    title: "Brand Identity Redesign",
    client: "TechStart Inc.",
    category: "Branding",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
    results: "Complete brand overhaul",
  },
  {
    title: "Social Media Campaign",
    client: "HealthyLife Co.",
    category: "Marketing",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    results: "+500K followers",
  },
  {
    title: "Corporate Website",
    client: "GlobalFinance",
    category: "Web Design",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    results: "40% conversion increase",
  },
  {
    title: "Local SEO Optimization",
    client: "CityDine Restaurant",
    category: "SEO",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
    results: "#1 local rankings",
  },
  {
    title: "Email Marketing Automation",
    client: "SaaS Platform",
    category: "Marketing",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
    results: "35% open rate",
  },
];

export default function Portfolios() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="portfolios-page">
      {/* Hero */}
      <section className="portfolios-hero">
        <div className="portfolios-container">
          <div className="portfolios-hero-content">
            <span className="portfolios-section-tag">OUR PORTFOLIO</span>
            <h1 className="portfolios-hero-title">Our Success Stories</h1>
            <p className="portfolios-hero-text">
              Explore our portfolio of successful projects and see how we've
              helped businesses achieve their digital marketing goals.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="portfolios-filter-section">
        <div className="portfolios-container">
          <div className="portfolios-filter-row">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? "portfolio-chip portfolio-chip--active"
                    : "portfolio-chip"
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="portfolios-grid-section">
        <div className="portfolios-container">
          <div className="portfolios-grid">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="portfolio-card">
                <div className="portfolio-card-media">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="portfolio-card-image"
                  />

                  <div className="portfolio-card-overlay">
                    <div className="portfolio-card-overlay-inner">
                      <Button className="portfolio-card-cta">
                        <span>View Project</span>
                        <ExternalLink className="portfolio-card-cta-icon" />
                      </Button>
                    </div>
                  </div>

                  <div className="portfolio-card-category">
                    <span>{project.category}</span>
                  </div>
                </div>

                <CardContent className="portfolio-card-content">
                  <h3 className="portfolio-card-title">{project.title}</h3>
                  <p className="portfolio-card-client">{project.client}</p>

                  <div className="portfolio-card-results">
                    <span className="portfolio-result-dot" />
                    <span className="portfolio-result-text">{project.results}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="portfolios-cta">
        <div className="portfolios-cta-container">
          <h2 className="portfolios-cta-title">Want Similar Results?</h2>
          <p className="portfolios-cta-text">
            Let's discuss how we can help transform your digital presence and
            achieve remarkable growth.
          </p>
          <Button className="portfolios-cta-btn">
            <span>Start Your Project</span>
            <ArrowRight className="portfolios-cta-icon" />
          </Button>
        </div>
      </section>
    </div>
  );
}
