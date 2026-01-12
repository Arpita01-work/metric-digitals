import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "../components/ui/button";
// Import the custom CSS file
import '../styles/TestimonialsSection.css'; 

const testimonials = [
  {
    name: "Sarah Parker",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    text: "Several Amazing Landing Page All-in-one, clean code, Creative & Modern design. Professional, Recommended combination and great experience. Nice product, clear manual on portfolio. Present seo-me-skelund, adipiscing elit."
  },
  {
    name: "Michael Chen",
    role: "CEO, TechStart",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    text: "The SEO strategies implemented by this team have transformed our online presence. We've seen a 200% increase in organic traffic within just 3 months!"
  },
  {
    name: "Emily Rodriguez",
    role: "E-commerce Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    text: "Outstanding service and results. Their team truly understands digital marketing and delivers measurable results consistently."
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const current = testimonials[currentIndex];
  
  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-grid">
          {/* Left - Testimonial Header */}
          <div className="testimonial-header">
            <span className="header-badge">
              TESTIMONIAL
            </span>
            <h2 className="header-title">
              See Feedback Why
              <br />
              Customers Love
              <br />
              Working With Us
            </h2>
            
            {/* Navigation */}
            <div className="navigation-buttons">
              <Button 
                variant="outline" 
                size="icon"
                onClick={prevTestimonial}
                className="nav-button prev-button"
              >
                <ChevronLeft className="nav-icon" />
              </Button>
              <Button 
                size="icon"
                onClick={nextTestimonial}
                className="nav-button next-button"
              >
                <ChevronRight className="nav-icon" />
              </Button>
            </div>
          </div>
          
          {/* Right - Testimonial Card */}
          <div className="testimonial-card">
            {/* Quote Icon */}
            <Quote className="quote-icon" />
            
            {/* Rating */}
            <div className="rating-stars">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="star-icon" />
              ))}
            </div>
            
            {/* Testimonial Text */}
            <p className="testimonial-text">
              {current.text}
            </p>
            
            {/* Author */}
            <div className="author-info">
              <img 
                src={current.image}
                alt={current.name}
                className="author-image"
              />
              <div>
                <h4 className="author-name">{current.name}</h4>
                <p className="author-role">{current.role}</p>
              </div>
            </div>
            
            {/* Dots */}
            <div className="navigation-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`dot-indicator ${index === currentIndex ? 'dot-active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}