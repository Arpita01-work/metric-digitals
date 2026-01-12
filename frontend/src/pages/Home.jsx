import React from 'react';
import HeroSection from "../components/HeroSection";
import ClientLogos from "../components/ClientLogos";
import ServicesSection from "../components/ServicesSection";
import StatsSection from "../components/StatsSection";
import MissionSection from "../components/MissionSection";
import ProcessSection from "../components/ProcessSection";
import TestimonialsSection from "../components/TestimonialsSection";
import BlogSection from "../components/BlogSection";
import FeaturesSection from '../components/FeatureSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ClientLogos />
      <ServicesSection />
      <StatsSection />
      <FeaturesSection/>
      <MissionSection />
      <ProcessSection />
      <TestimonialsSection />
      <BlogSection />
    </div>
  );
}