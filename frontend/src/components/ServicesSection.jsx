// src/components/ServicesSection.jsx
import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { FileText, Mail, Share2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import "../styles/ServiceSection.css";

const services = [
  {
    icon: FileText,
    title: "Content Marketing",
    description:
      "Content marketing is a strategic approach focused on creating, publishing, and distributing valuable.",
    featured: false,
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description:
      "Email marketing is a digital marketing strategy that involves sending targeted emails.",
    featured: true,
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description:
      "Social media marketing is a form of digital marketing that uses social media platforms.",
    featured: false,
  },
];

export default function ServicesSection() {
  return (
    <section className="services">
      <div className="services-container">
        {/* Section Header */}
        <div className="services-header">
          <span className="services-tag">OUR SERVICES</span>
          <h2 className="services-title">
            Enhance Your SEO Rankings with Expert Strategies
          </h2>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            const featuredClass = service.featured
              ? "service-card--featured"
              : "";

            return (
              <Card
                key={index}
                className={`service-card ${featuredClass}`}
              >
                <CardContent className="service-card-content">
                  <div
                    className={`service-icon-wrapper ${
                      service.featured
                        ? "service-icon-wrapper--featured"
                        : ""
                    }`}
                  >
                    <Icon
                      className={`service-icon ${
                        service.featured ? "service-icon--featured" : ""
                      }`}
                    />
                  </div>

                  <h3
                    className={`service-title ${
                      service.featured ? "service-title--featured" : ""
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`service-description ${
                      service.featured
                        ? "service-description--featured"
                        : ""
                    }`}
                  >
                    {service.description}
                  </p>

                  <button
                    className={`service-learn-more ${
                      service.featured
                        ? "service-learn-more--featured"
                        : ""
                    }`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="service-learn-more-icon" />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="services-footer">
          <Link to={createPageUrl("Services")}>
            <Button variant="outline" className="services-view-all-btn">
              <span>View All Service</span>
              <ArrowRight className="services-view-all-icon" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
