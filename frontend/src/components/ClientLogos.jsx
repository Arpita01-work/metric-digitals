// src/components/ClientLogos.jsx
import React from "react";
import "../styles/ClientLogos.css";

const clients = [
  { name: "classpass", logo: "ClassPass" },
  { name: "mailchimp", logo: "Mailchimp" },
  { name: "maze", logo: "Maze" },
  { name: "hashicorp", logo: "HashiCorp" },
  { name: "basecamp", logo: "Basecamp" },
];

export default function ClientLogos() {
  return (
    <section className="client-logos">
      <div className="client-logos-container">
        <div className="client-logos-row">
          {clients.map((client, index) => (
            <div key={index} className="client-logo-item">
              <div className="client-logo-icon">
                <span>{client.logo[0]}</span>
              </div>
              <span className="client-logo-text">{client.logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
