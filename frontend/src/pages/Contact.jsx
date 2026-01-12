// src/pages/Contact.jsx
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import "../styles/Contact.css";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Location",
    details: ["123 Business Street, Suite 100", "New York, NY 10001"],
  },
  {
    icon: Phone,
    title: "Phone Number",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["info@vinoma.com", "support@vinoma.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-container">
          <div className="contact-hero-content">
            <span className="contact-section-tag">CONTACT US</span>
            <h1 className="contact-hero-title">Get In Touch With Us</h1>
            <p className="contact-hero-text">
              Have a question or want to work together? We&apos;d love to hear
              from you. Send us a message and we&apos;ll respond as soon as
              possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="contact-container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="contact-info-card">
                  <CardContent className="contact-info-card-content">
                    <div className="contact-info-icon-wrapper">
                      <Icon className="contact-info-icon" />
                    </div>
                    <h3 className="contact-info-title">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="contact-info-text">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="contact-main-section">
        <div className="contact-container">
          <div className="contact-main-grid">
            {/* Form */}
            <div className="contact-form-card">
              <h2 className="contact-form-title">Send Us A Message</h2>
              <p className="contact-form-subtitle">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label className="contact-label">Your Name</label>
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="contact-input"
                      required
                    />
                  </div>
                  <div className="contact-form-field">
                    <label className="contact-label">Email Address</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="contact-input"
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label className="contact-label">Phone Number</label>
                    <Input
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="contact-input"
                    />
                  </div>
                  <div className="contact-form-field">
                    <label className="contact-label">Subject</label>
                    <Input
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="contact-input"
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-field">
                  <label className="contact-label">Your Message</label>
                  <Textarea
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="contact-textarea"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="contact-submit-btn"
                >
                  <span>Send Message</span>
                  <Send className="contact-submit-icon" />
                </Button>
              </form>
            </div>

            {/* Map / Image */}
            <div className="contact-map-wrapper">
              <div className="contact-map-card">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                  alt="Office"
                  className="contact-map-image"
                />
                <div className="contact-map-overlay" />
                <div className="contact-map-content">
                  <h3 className="contact-map-title">Visit Our Office</h3>
                  <p className="contact-map-text">
                    We&apos;re always happy to meet in person. Drop by our
                    office for a coffee and a chat about your project.
                  </p>
                  <Button
                    variant="outline"
                    className="contact-map-button"
                  >
                    <span>Get Directions</span>
                    <ArrowRight className="contact-map-button-icon" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta-section">
        <div className="contact-cta-container">
          <h2 className="contact-cta-title">
            Ready to Grow Your Business?
          </h2>
          <p className="contact-cta-text">
            Let&apos;s discuss how we can help you achieve your digital
            marketing goals.
          </p>
          <Button className="contact-cta-button">
            <span>Schedule a Free Consultation</span>
            <ArrowRight className="contact-cta-button-icon" />
          </Button>
        </div>
      </section>
    </div>
  );
}
