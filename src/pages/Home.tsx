import React from "react";
import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import IndustriesServed from "../components/IndustriesServed";
import StatsCounter from "../components/StatsCounter";
import About from "../components/About";
import ProcessTimeline from "../components/ProcessTimeline";
import TechnologiesStack from "../components/TechnologiesStack";
import ProjectsGallery from "../components/ProjectsGallery";
import Testimonials from "../components/Testimonials";
import CTABanner from "../components/CTABanner";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <ServicesGrid />

      {/* Industries Served Section */}
      <IndustriesServed />

      {/* Stats Counter Section */}
      <StatsCounter />

      {/* About Section */}
      <About />

      {/* Process Section */}
      <ProcessTimeline />

      {/* Technologies Stack & Why Choose Us Section */}
      <TechnologiesStack />

      {/* Projects Section */}
      <ProjectsGallery />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Banner Section */}
      <CTABanner />
    </>
  );
}
