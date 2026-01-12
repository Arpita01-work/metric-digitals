// src/components/ProcessSection.jsx
import React from "react";
import { Lightbulb, Settings, Trophy } from "lucide-react";
import "../styles/ProcessSection.css";

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Creative Ideas",
    description:
      "Every business is unique. That's why we tailor our SEO and marketing services to meet your specific goals, industry requirements, strategies, and target audience.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Execution",
    description:
      "Every business is unique. That's why we tailor our SEO and marketing services to meet your specific goals, industry requirements, and target audience.",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Finishing",
    description:
      "Every business is unique. That's why we tailor our SEO and marketing services to meet your specific goals, industry requirements, and target audience.",
  },
];

export default function ProcessSection() {
  return (
    <section className="process">
      <div className="process-container">
        {/* Section Header */}
        <div className="process-header">
          <span className="process-tag">WORK PROCESS</span>
          <h2 className="process-title">
            Our Working Process Faster
            <br />
            And Easier.
          </h2>
        </div>

        {/* Process Steps */}
        <div className="process-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="process-step">
                {/* Step Number */}
                <div className="process-step-number">{step.number}</div>

                {/* Icon */}
                <div className="process-icon-wrapper">
                  <Icon className="process-icon" />
                </div>

                {/* Content */}
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-text">{step.description}</p>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="process-connector" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
